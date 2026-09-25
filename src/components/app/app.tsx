import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps.ts';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const [appliedState, setAppliedState] =
    useState<ArticleStateType>(defaultArticleState);
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedState.fontFamilyOption.value,
          '--font-size': appliedState.fontSizeOption.value,
          '--font-color': appliedState.fontColor.value,
          '--container-width': appliedState.contentWidth.value,
          '--bg-color': appliedState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isOpen={isPanelOpen}
        onToggle={(): void => setIsPanelOpen((prev) => !prev)}
        formState={formState}
        onChange={setFormState}
        onApply={(): void => setAppliedState(formState)}
        onReset={(): void => {
          setFormState(defaultArticleState);
          setAppliedState(defaultArticleState);
        }}
      />
      <Article />
    </main>
  );
};
