import { codeGenerator, setSessionStorage } from "../../utils";
import StoreModule from "../module";

class Language extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      language: "en",
    }
  };
  async changeLanguage(lang) {
    setSessionStorage("lang", lang);
    this.setState({
      ...this.getState(),
      language: lang,
    }, 'Язык изменен');
  }
}

export default Language;