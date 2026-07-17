import { ChampionAvatar } from "@/components/game/champion-avatar";
import { cn } from "@/utils/cn";
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
};

type SearchBarProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  suggestions?: SearchBarSuggestion[];
  isSubmitAllowed?: (value: string) => boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onSuggestionSelect?: (suggestion: SearchBarSuggestion) => void;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      placeholder = "Search Champions...",
      disabled,
      suggestions = [],
      isSubmitAllowed,
      onChange,
      onSubmit,
      onSuggestionSelect,
    },
    ref,
  ) => {
    const listboxId = useId();
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

    const selectSuggestion = (suggestion: SearchBarSuggestion) => {
      updateValue(suggestion.label);
      closeSuggestions();
      onSuggestionSelect?.(suggestion);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (shouldShowSuggestions && highlightedSuggestionIndex >= 0) {
        selectSuggestion(visibleSuggestions[highlightedSuggestionIndex]);
        return;
      }

      if (shouldShowSuggestions && visibleSuggestions.length === 1) {
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
      if (!hasInputValue || visibleSuggestions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsSuggestionListVisible(true);
        setHighlightedSuggestionIndex((currentIndex) =>
          currentIndex >= visibleSuggestions.length - 1 ? 0 : currentIndex + 1,
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIsSuggestionListVisible(true);
        setHighlightedSuggestionIndex((currentIndex) =>
          currentIndex <= 0 ? visibleSuggestions.length - 1 : currentIndex - 1,
        );
      }

      if (
        event.key === "Enter" &&
        shouldShowSuggestions &&
        highlightedSuggestionIndex >= 0
      ) {
        event.preventDefault();
        selectSuggestion(visibleSuggestions[highlightedSuggestionIndex]);
      }

      if (event.key === "Escape" && shouldShowSuggestions) {
        event.preventDefault();
        closeSuggestions();
      }
    };

    return (
      <div className="relative">
        <form
          className={cn(
            "flex border-3 p-3 border-purple bg-surface items-center gap-2",
            disabled
              ? "border-gray-300 bg-gray-100"
              : "border-purple bg-surface",
          )}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Search className={disabled ? "text-gray-300" : "text-purple"} />
          <input
            ref={inputRef}
            className="text-black flex items-center text-2xl outline-0 w-full disabled:opacity-60"
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
        </form>

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
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-2xl outline-0 transition-colors",
                      isHighlighted ? "bg-purple-surface/15" : "hover:bg-muted",
                    )}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectSuggestion(suggestion);
                    }}
                    onMouseEnter={() => setHighlightedSuggestionIndex(index)}
                  >
                    <ChampionAvatar
                      championName={suggestion.label}
                      championImg={suggestion.imageSrc}
                      championEmoji={suggestion.emoji}
                      size="sm"
                    />
                    <span className="leading-none">{suggestion.label}</span>
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
