import { cn as bem } from "@bem-react/classname";
import './style.css';
import { setSessionStorage } from "../../utils";
import PropTypes from "prop-types";

export const LanguageSwitcher = (props) => {

  const cn = bem('LanguageSwitcher');

  const handleLanguageChange = (event) => {

    props.handlerLang(event.target.value);
  };

  return (
    <div className={cn()}>
      <select value={props.lang} onChange={handleLanguageChange}>
        <option value="en">🇬🇧 English</option>
        <option value="ru">🇷🇺 Русский</option>
      </select>
    </div>
  );
};

LanguageSwitcher.propTypes = {
  lang: PropTypes.string,
  handlerLang: PropTypes.func
}

LanguageSwitcher.defaultProps = {

}
