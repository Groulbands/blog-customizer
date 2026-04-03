import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultArticleStateLocalData = localStorage.getItem(
		'defaultArticleState'
	);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleStateLocalData
						? JSON.parse(defaultArticleStateLocalData).fontFamilyOption.value
						: defaultArticleState,
					'--font-size': defaultArticleStateLocalData
						? JSON.parse(defaultArticleStateLocalData).fontSizeOption.value
						: defaultArticleState,
					'--font-color': defaultArticleStateLocalData
						? JSON.parse(defaultArticleStateLocalData).fontColor.value
						: defaultArticleState,
					'--container-width': defaultArticleStateLocalData
						? JSON.parse(defaultArticleStateLocalData).contentWidth.value
						: defaultArticleState,
					'--bg-color': defaultArticleStateLocalData
						? JSON.parse(defaultArticleStateLocalData).backgroundColor.value
						: defaultArticleState,
				} as CSSProperties
			}>
			<ArticleParamsForm />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
