import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import { LanguageSwitcher } from "../language-switcher";

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LanguageSwitcher lang={props.lang} handlerLang={props.handlerLang} />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  handlerLang: PropTypes.func
};

export default memo(Head);
