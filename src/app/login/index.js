import { memo } from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import { Auth } from '../../containers/auth';
import { HeadProfile } from '../../containers/head-profile';

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {

  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadProfile />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Auth />
    </PageLayout>
  );
}

export default memo(Login);
