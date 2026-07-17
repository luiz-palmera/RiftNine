import { ChampionAvatar } from "@/components/game/champion-avatar";
import { cn } from "@/utils/cn";
import { motion, useAnimationControls } from "motion/react";
import { Search } from "pixelarticons/react";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

export type SearchBarSuggestion = {
  id: string;
  label: string;
  imageSrc?: string;
  emoji?: string;
  disabled?: boolean;
  trailingLabel?: string;
};

type SearchBarVariant = "default" | "destructive";

type SearchBarProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: SearchBarVariant;
  shakeKey?: number;
  suggestions?: SearchBarSuggestion[];
  isSubmitAllowed?: (value: string) => boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit?: (value: string) => void;
  onSuggestionSelect?: (suggestion: SearchBarSuggestion) => void;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      placeholder = "Search Champions...",
      disabled,
      variant = "default",
      shakeKey = 0,
      suggestions = [],
      isSubmitAllowed,
      onChange,
      onKeyDown,
      onSubmit,
      onSuggestionSelect,
    },
    ref,
  ) => {
    const listboxId = useId();
    const shakeControls = useAnimationControls();
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState("");
    const [isSuggestionListVisible, setIsSuggestionListVisible] =
      useState(false);
    const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] =
      useState(-1);
    const inputValue = value ?? internalValue;
    const hasInputValue = inputValue.trim().length > 0;
    const visibleSuggestions =
      hasInputValue && !disabled ? suggestions.slice(0, 5) : [];
    const shouldShowSuggestions =
      isSuggestionListVisible && visibleSuggestions.length > 0;
    const activeSuggestionId =
      shouldShowSuggestions && highlightedSuggestionIndex >= 0
        ? `${listboxId}-${highlightedSuggestionIndex}`
        : undefined;

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (!shakeKey) {
        return;
      }

      void shakeControls.start({
        x: [0, -8, 8, -6, 6, 0],
        transition: { duration: 0.32 },
      });
    }, [shakeControls, shakeKey]);

    useEffect(() => {
      setHighlightedSuggestionIndex(-1);

      if (!hasInputValue || disabled || suggestions.length === 0) {
        setIsSuggestionListVisible(false);
      }
    }, [disabled, hasInputValue, inputValue, suggestions.length]);

    const closeSuggestions = () => {
      setIsSuggestionListVisible(false);
      setHighlightedSuggestionIndex(-1);
    };

    const updateValue = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    };

    const getNextEnabledSuggestionIndex = (
      currentIndex: number,
      direction: "next" | "previous",
    ) => {
      const enabledSuggestionIndexes = visibleSuggestions
        .map((suggestion, index) => (suggestion.disabled ? -1 : index))
        .filter((index) => index !== -1);

      if (enabledSuggestionIndexes.length === 0) {
        return -1;
      }

      const currentEnabledIndex =
        enabledSuggestionIndexes.indexOf(currentIndex);

      if (direction === "next") {
        return enabledSuggestionIndexes[
          currentEnabledIndex === -1 ||
          currentEnabledIndex === enabledSuggestionIndexes.length - 1
            ? 0
            : currentEnabledIndex + 1
        ];
      }

      return enabledSuggestionIndexes[
        currentEnabledIndex <= 0
          ? enabledSuggestionIndexes.length - 1
          : currentEnabledIndex - 1
      ];
    };

    const selectSuggestion = (
      suggestion: SearchBarSuggestion,
      shouldSubmit = false,
    ) => {
      if (suggestion.disabled) {
        window.requestAnimationFrame(() => inputRef.current?.focus());
        return;
      }

      updateValue(suggestion.label);
      closeSuggestions();
      onSuggestionSelect?.(suggestion);
      if (shouldSubmit) {
        onSubmit?.(suggestion.label);
      }
      window.requestAnimationFrame(() => inputRef.current?.focus());
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (shouldShowSuggestions && highlightedSuggestionIndex >= 0) {
        const highlightedSuggestion =
          visibleSuggestions[highlightedSuggestionIndex];

        if (highlightedSuggestion && !highlightedSuggestion.disabled) {
          selectSuggestion(highlightedSuggestion);
          return;
        }
      }

      if (
        shouldShowSuggestions &&
        visibleSuggestions.length === 1 &&
        !visibleSuggestions[0].disabled
      ) {
        closeSuggestions();
        onSubmit?.(visibleSuggestions[0].label);
        return;
      }

      closeSuggestions();

      const submittedValue = inputValue.trim();

      if (
        !submittedValue ||
        (isSubmitAllowed && !isSubmitAllowed(submittedValue))
      ) {
        return;
      }

      onSubmit?.(submittedValue);
    };

    const handleChange = (nextValue: string) => {
      updateValue(nextValue);
      setHighlightedSuggestionIndex(-1);
      setIsSuggestionListVisible(nextValue.trim().length > 0);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (!hasInputValue || visibleSuggestions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsSuggestionListVisible(true);
        setHighlightedSuggestionIndex((currentIndex) =>
          getNextEnabledSuggestionIndex(currentIndex, "next"),
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIsSuggestionListVisible(true);
        setHighlightedSuggestionIndex((currentIndex) =>
          getNextEnabledSuggestionIndex(currentIndex, "previous"),
        );
      }

      if (event.key === "Enter" && shouldShowSuggestions) {
        if (
          visibleSuggestions.length === 1 &&
          !visibleSuggestions[0].disabled
        ) {
          event.preventDefault();
          closeSuggestions();
          onSubmit?.(visibleSuggestions[0].label);
          return;
        }

        if (highlightedSuggestionIndex >= 0) {
          event.preventDefault();
          selectSuggestion(visibleSuggestions[highlightedSuggestionIndex]);
        }
      }

      if (event.key === "Escape" && shouldShowSuggestions) {
        event.preventDefault();
        closeSuggestions();
      }
    };

    return (
      <div className="relative min-w-0">
        <motion.form
          animate={shakeControls}
          className={cn(
            "flex min-w-0 items-center gap-2 border-3 border-purple bg-surface p-3",
            disabled && "border-gray-300 bg-gray-100",
            !disabled && variant === "default" && "border-purple bg-surface",
            !disabled && variant === "destructive" && "border-red bg-surface",
          )}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Search
            className={cn(
              disabled && "text-gray-300",
              !disabled && variant === "default" && "text-purple",
              !disabled && variant === "destructive" && "text-red",
            )}
          />
          <input
            ref={inputRef}
            className="flex min-w-0 w-full items-center text-2xl text-black outline-0 disabled:opacity-60"
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={shouldShowSuggestions ? listboxId : undefined}
            aria-expanded={shouldShowSuggestions}
            aria-activedescendant={activeSuggestionId}
            onBlur={closeSuggestions}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => {
              if (hasInputValue && suggestions.length > 0) {
                setIsSuggestionListVisible(true);
              }
            }}
            onKeyDown={handleInputKeyDown}
          />
        </motion.form>

        {shouldShowSuggestions && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute right-0 bottom-full left-0 z-20 mb-1 max-h-72 overflow-y-auto border-3 border-purple bg-surface text-text-main pixel-shadow"
          >
            {visibleSuggestions.map((suggestion, index) => {
              const isHighlighted = index === highlightedSuggestionIndex;

              return (
                <li key={suggestion.id} role="presentation">
                  <button
                    id={`${listboxId}-${index}`}
                    type="button"
                    role="option"
                    tabIndex={-1}
                    aria-selected={isHighlighted}
                    aria-disabled={suggestion.disabled}
                    className={cn(
                      "flex min-h-12 w-full items-center gap-3 px-3 py-2 text-left text-xl outline-0 transition-colors sm:text-2xl",
                      suggestion.disabled
                        ? "cursor-not-allowed text-gray-400 opacity-70"
                        : "cursor-pointer",
                      !suggestion.disabled &&
                        (isHighlighted
                          ? "bg-purple-surface/15"
                          : "hover:bg-muted"),
                    )}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectSuggestion(suggestion, true);
                    }}
                    onMouseEnter={() => {
                      if (!suggestion.disabled) {
                        setHighlightedSuggestionIndex(index);
                      }
                    }}
                  >
                    <span className={cn(suggestion.disabled && "opacity-50")}>
                      <ChampionAvatar
                        championName={suggestion.label}
                        championImg={suggestion.imageSrc}
                        championEmoji={suggestion.emoji}
                        size="sm"
                      />
                    </span>
                    <span className="min-w-0 flex-1 truncate leading-none">
                      {suggestion.label}
                    </span>
                    {suggestion.trailingLabel && (
                      <span className="shrink-0 text-right text-sm leading-none text-gray-400 sm:text-base">
                        {suggestion.trailingLabel}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);
