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

import type { ArticleStateType } from 'src/constants/articleProps.ts';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const sidebarRef = useRef<HTMLElement>(null);
  const togglePanel = (): void => setIsOpen((prev) => !prev);

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleApply = (): void => {
    onApply(formState);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (sidebarRef.current?.contains(target)) return;

      const arrow = document.querySelector(
        '[aria-label="Открыть/Закрыть форму параметров статьи"]'
      );

      if (arrow?.contains(target)) return;

      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={togglePanel} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
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
          <div className={styles.title}>
            <Text as="h2" size={31} weight={800} uppercase={true}>
              Задайте параметры
            </Text>
          </div>
          <div className={styles.selected}>
            <div className={styles.sectionTitle}>
              <Text as="h2" size={12} weight={800} uppercase={true}>
                Шрифт
              </Text>
            </div>
            <Select
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={(option): void => {
                setFormState({ ...formState, fontFamilyOption: option });
              }}
            />
          </div>
          <div className={styles.selected}>
            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(option): void =>
                setFormState({ ...formState, fontSizeOption: option })
              }
            />
          </div>
          <div className={styles.selected}>
            <div className={styles.sectionTitle}>
              <Text as="h2" size={12} weight={800}>
                Цвет шрифта
              </Text>
            </div>
            <Select
              selected={formState.fontColor}
              options={fontColors}
              onChange={(option): void => {
                setFormState({ ...formState, fontColor: option });
              }}
            />
          </div>
          <Separator />
          <div className={styles.selectedTwo}>
            <div className={styles.sectionTitle}>
              <Text as="h2" size={12} weight={800}>
                цвет фона
              </Text>
            </div>
            <Select
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={(option): void => {
                setFormState({ ...formState, backgroundColor: option });
              }}
            />
          </div>
          <div className={styles.selectedFree}>
            <div className={styles.sectionTitle}>
              <Text as="h2" size={12} weight={800}>
                ширина контента
              </Text>
            </div>
            <Select
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={(option): void => {
                setFormState({ ...formState, contentWidth: option });
              }}
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
