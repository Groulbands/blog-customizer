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
	defaultArticleState,
} from 'src/constants/articleProps';
import { Button } from 'src/ui/button';
import { useState, useRef, useCallback } from 'react';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const asideRef = useRef<HTMLElement>(null);
	const defaultArticleStateLocalData = localStorage.getItem(
		'defaultArticleState'
	);
	const [artState, setArtState] = useState(
		defaultArticleStateLocalData
			? JSON.parse(defaultArticleStateLocalData)
			: defaultArticleState
	);
	const mainRef = document.getElementsByTagName('main')[0];

	const handleCloseSideBar = useCallback((e: Event) => {
		if (
			asideRef &&
			e.target instanceof Element &&
			!asideRef.current?.contains(e.target) &&
			!e.target.closest('[role="button"]')
		) {
			setIsOpen(false);
			asideRef.current?.classList.toggle(styles.container_open);
			document.removeEventListener('mousedown', handleCloseSideBar);
		}
	}, []);

	const handleChangeState = useCallback(
		(value: OptionType, stateOption: string) => {
			setArtState({ ...artState, [stateOption]: value });
		},
		[]
	);

	const confirmChange = () => {
		if (confirm('Подтвердите применение стилей')) {
			localStorage.setItem('defaultArticleState', JSON.stringify(artState));
			mainRef?.style.setProperty(
				'--font-family',
				artState.fontFamilyOption.value
			);
			mainRef?.style.setProperty('--font-size', artState.fontSizeOption.value);
			mainRef?.style.setProperty('--font-color', artState.fontColor.value);
			mainRef?.style.setProperty(
				'--container-width',
				artState.contentWidth.value
			);
			mainRef?.style.setProperty('--bg-color', artState.backgroundColor.value);
		}
	};

	const cancelChange = () => {
		if (confirm('Подтвердите сброс стилей')) {
			setArtState(
				defaultArticleStateLocalData
					? JSON.parse(defaultArticleStateLocalData)
					: defaultArticleState
			);
		}
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					if (isOpen) {
						document.removeEventListener('mousedown', handleCloseSideBar);
					} else {
						document.addEventListener('mousedown', handleCloseSideBar);
					}
					setIsOpen(!isOpen);
					asideRef.current?.classList.toggle(styles.container_open);
				}}
			/>
			<aside ref={asideRef} className={styles.container}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'fontFamilyOption');
						}}
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={artState.fontFamilyOption}
					/>
					<RadioGroup
						onChange={(value) => {
							handleChangeState(value, 'fontSizeOption');
						}}
						name='fontSizeRadio'
						options={fontSizeOptions}
						selected={artState.fontSizeOption}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'fontColor');
						}}
						title='ЦВЕТ ШРИФТА'
						options={fontColors}
						selected={artState.fontColor}
					/>
					<Separator></Separator>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'backgroundColor');
						}}
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={artState.backgroundColor}
					/>
					<Select
						onChange={(value) => {
							handleChangeState(value, 'contentWidth');
						}}
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={artState.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={() => {
								cancelChange();
							}}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							onClick={() => {
								confirmChange();
							}}
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
