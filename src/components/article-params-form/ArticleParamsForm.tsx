import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	artState: ArticleStateType;
	setArtState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	artState,
	setArtState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const asideRef = useRef<HTMLElement>(null);
	const [artStateTemp, setArtStateTemp] = useState<ArticleStateType>(artState);

	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e: MouseEvent) => {
			if (
				asideRef.current &&
				e.target instanceof Element &&
				!asideRef.current?.contains(e.target) &&
				!e.target.closest('[role="button"]')
			) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key == 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	const handleChangeState = (value: OptionType, stateOption: string) => {
		setArtStateTemp({ ...artStateTemp, [stateOption]: value });
	};

	const confirmChange = (submit: React.FormEvent<HTMLFormElement>) => {
		submit.preventDefault();
		if (confirm('Подтвердите применение стилей')) {
			setArtState(artStateTemp);
		}
	};

	const cancelChange = () => {
		if (confirm('Подтвердите сброс стилей')) {
			setArtState(defaultArticleState);
			setArtStateTemp(defaultArticleState);
		}
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(submit) => {
						confirmChange(submit);
					}}
					onReset={cancelChange}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'fontFamilyOption');
						}}
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={artStateTemp.fontFamilyOption}
					/>
					<RadioGroup
						onChange={(value) => {
							handleChangeState(value, 'fontSizeOption');
						}}
						name='fontSizeRadio'
						options={fontSizeOptions}
						selected={artStateTemp.fontSizeOption}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'fontColor');
						}}
						title='ЦВЕТ ШРИФТА'
						options={fontColors}
						selected={artStateTemp.fontColor}
					/>
					<Separator></Separator>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'backgroundColor');
						}}
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={artStateTemp.backgroundColor}
					/>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'contentWidth');
						}}
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={artStateTemp.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
