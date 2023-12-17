import { memo } from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import { HeadProfile } from '../../containers/head-profile';
import { ProfileContainer } from '../../containers/profile-container';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadProfile />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileContainer />
    </PageLayout>
  );
}

export default memo(Profile);
