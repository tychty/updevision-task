import {
  type ChangeEventHandler,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

type AutoCompleteItem = {
  value: string;
};

type AutoCompleteProps<T extends AutoCompleteItem> = {
  value?: string;
  options: T[];
  onSearch?: (str: string) => void; // Promise<T[]>;
  onSelect?: (option: T) => void;
  onChange?: (str: string) => void;
  placeholder?: string;
};

function AutoComplete<T extends AutoCompleteItem>({
  options,
  value,
  onChange,
  onSearch,
}: AutoCompleteProps<T>) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value);
    onSearch?.(e.target.value);
    setOptionsOpen(true);
  };
  const onSelectSelect = useCallback(
    (item: AutoCompleteItem, index: number) => {
      const str = item.value;
      console.log(str);
      if (!inputRef.current) throw new Error("inputRef is null");

      inputRef.current.value = str;
      onChange?.(str);
      setOptionsOpen(false);
      setCurrentOption(index);
    },
    [onChange]
  );

  useEffect(() => {
    setCurrentOption(-1);
  }, [options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!event.target) throw new Error("");
      if (mainRef.current && !mainRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    }
    function handleKeyClick(e: KeyboardEvent) {
      console.log(e.key);
      switch (e.key) {
        case "ArrowDown":
          setCurrentOption((x) => Math.min(x + 1, options.length - 1));
          break;
        case "ArrowUp":
          setCurrentOption((x) => Math.max(0, x - 1));
          break;
        case "Enter":
          onSelectSelect(options[currentOption], currentOption);
          break;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyClick);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyClick);
    };
  }, [options, currentOption, onSelectSelect]);

  return (
    <div ref={mainRef}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onInputChange}
      />
      <div hidden={!optionsOpen} className="optionswrap">
        {options.map((opt, i) => (
          <div
            className="item"
            style={{
              backgroundColor: i === currentOption ? "grey" : undefined,
            }}
            key={opt.value}
            onClick={() => onSelectSelect(opt, i)}
          >
            {opt.value}
          </div>
        ))}
      </div>
    </div>
  );
}
export default AutoComplete;
