import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useSelector as useSelectRedux } from "react-redux";
import useTranslate from '../../hooks/use-translate';
import List from '../../components/list';
import Spinner from '../../components/spinner';
import { CommentHead } from '../../components/comment-head';
import { AuthCommentForm } from '../../components/auth-comment-form';
import { Comment } from '../../components/comment';
import listToTree from '../../utils/list-to-tree';
import { PaddingLayout } from '../../components/padding-layout';

export const Comments = memo(() => {
  const store = useStore();

  const selectRedux = useSelectRedux(state => ({
    total: state.comments.total,
    waiting: state.comments.waiting,
    comments: state.comments.list || [],
  }));
  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const comments = useMemo(() => {
    if (selectRedux.comments?.length) {
      return listToTree(selectRedux.comments)[0].children
    }
    return []
  }
    , [selectRedux.comments]);
  
  const callbacks = {
    // Добавление комментария
    addToComment: useCallback(() => console.log("addToComment"), [store]),
  }

  const { t } = useTranslate();

  const renders = {
    item: useCallback(item => (
      <>
        <Comment item={item} onAdd={callbacks.addToComment}
          labelAdd={t('comment.answer')} />
        {item.children?.length ?
          <PaddingLayout padding={"large"}>
            <List list={item.children} renderItem={renders.item} isBorder={false} />
          </PaddingLayout>
          : null
        }
      </>
    ), [callbacks.addToComment, t]),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentHead total={selectRedux.total} />
      <List list={comments} renderItem={renders.item} isBorder={false} />
      <AuthCommentForm exists={select.exists} />
    </Spinner>
  );
});
