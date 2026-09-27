import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { OptionType, ArticleStateType } from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const togglePanel = (): void => setIsPanelOpen((prev) => !prev);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleApply = (): void => {
    onApply(formState);
  };

  const handleChange =
    (filed: keyof ArticleStateType) =>
    (option: OptionType): void =>
      setFormState((prev) => ({ ...prev, [filed]: option }));

  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (containerRef.current?.contains(target)) return;

      setIsPanelOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPanelOpen]);

  return (
    <div ref={containerRef}>
      <ArrowButton isOpen={isPanelOpen} onClick={togglePanel} />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isPanelOpen })}
      >
        <form
          className={styles.form}
          onSubmit={(e): void => {
            e.preventDefault();
            handleApply();
          }}
          onReset={(e): void => {
            e.preventDefault();
            handleReset();
          }}
        >
          <Text size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
