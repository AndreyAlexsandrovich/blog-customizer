import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
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
  isOpen: boolean;
  onToggle: () => void;
  formState: ArticleStateType;
  onChange: (state: ArticleStateType) => void;
  onApply: () => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  isOpen,
  onToggle,
  formState,
  onChange,
  onApply,
  onReset,
}: ArticleParamsFormProps): React.JSX.Element => {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (sidebarRef.current?.contains(target)) return;

      const arrow = document.querySelector(
        '[aria-label="Открыть/Закрыть форму параметров статьи"]'
      );

      if (arrow?.contains(target)) return;

      onToggle();
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form
          className={styles.form}
          onSubmit={(e): void => {
            e.preventDefault();
            onApply();
          }}
          onReset={(e): void => {
            e.preventDefault();
            onReset();
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
                onChange({ ...formState, fontFamilyOption: option });
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
                onChange({ ...formState, fontSizeOption: option })
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
                onChange({ ...formState, fontColor: option });
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
                onChange({ ...formState, backgroundColor: option });
              }}
            />
          </div>
          <Text as="h2" size={12} weight={800}>
            ширина контента
          </Text>
          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option): void => {
              onChange({ ...formState, contentWidth: option });
            }}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
