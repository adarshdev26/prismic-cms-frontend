import { type FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `PartnerSearch`.
 */
export type PartnerSearchProps =
  SliceComponentProps<Content.PartnerSearchSlice>;

/**
 * Component for "Partner Search" Slices.
 */
const PartnerSearch: FC<PartnerSearchProps> = ({ slice }) => {
  const labelText = isFilled.keyText(slice.primary.label)
    ? slice.primary.label
    : "Partner search";
  const placeholderText = isFilled.keyText(slice.primary.placeholder)
    ? slice.primary.placeholder
    : "Start typing to search for a partner...";

  const options = slice.primary.options
    .map((item) => item.option_label)
    .filter((value): value is string => isFilled.keyText(value));
  const datalistId = `${slice.slice_type}-${slice.variation}-options`;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.container}>
        <h3 className={styles.label}>{labelText}</h3>

        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder={placeholderText}
            list={options.length ? datalistId : undefined}
            aria-label={labelText}
          />
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8L10 12L14 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {options.length > 0 && (
            <datalist id={datalistId}>
              {options.map((value) => (
                <option key={value} value={value} />
              ))}
            </datalist>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerSearch;
