import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [artState, setArtState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': artState.fontFamilyOption.value,
					'--font-size': artState.fontSizeOption.value,
					'--font-color': artState.fontColor.value,
					'--container-width': artState.contentWidth.value,
					'--bg-color': artState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm artState={artState} setArtState={setArtState} />
			<Article />
		</main>
	);
};
