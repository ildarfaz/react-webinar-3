import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useSelector as useSelectRedux } from "react-redux";
import useTranslate from '../../hooks/use-translate';
import List from '../../components/list';
import Spinner from '../../components/spinner';
import { CommentHead } from '../../components/comment-head';
import { AuthCommentForm } from '../../components/auth-comment-form';
import { Comment } from '../../components/comment';

export const Comments = memo(() => {
  const store = useStore();

  const selectRedux = useSelectRedux(state => ({
    total: state.comments.total,
    waiting: state.comments.waiting,
    list: state.comments.list || [],
  }));
  const select = useSelector(state => ({
    exists: state.session.exists
  }));
  
  const callbacks = {
    // Добавление комментария
    addToComment: useCallback(() => console.log("addToComment"), [store]),
  }

  const { t } = useTranslate();

  const renders = {
    item: useCallback(item => (
      <Comment item={item} onAdd={callbacks.addToComment}
        labelAdd={t('comment.answer')} />
    ), [callbacks.addToComment, t]),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentHead total={selectRedux.total} />
      <List list={selectRedux.list} renderItem={renders.item} isBorder={false} />
      <AuthCommentForm exists={select.exists} />
    </Spinner>
  );
});
