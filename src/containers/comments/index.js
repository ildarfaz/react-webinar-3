import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useDispatch, useSelector as useSelectRedux } from "react-redux";
import useTranslate from '../../hooks/use-translate';
import List from '../../components/list';
import Spinner from '../../components/spinner';
import { CommentHead } from '../../components/comment-head';
import { AuthCommentForm } from '../../components/auth-comment-form';
import { Comment } from '../../components/comment';
import listToTree from '../../utils/list-to-tree';
import { PaddingLayout } from '../../components/padding-layout';
import { CommentForm } from '../../components/comment-form';
import { ContentLayout } from '../../components/content-layout';
import commentsActions from '../../store-redux/comments/actions';

export const Comments = memo(() => {
  const store = useStore();
  const dispatch = useDispatch();
  const selectRedux = useSelectRedux(state => ({
    total: state.comments.total,
    waiting: state.comments.waiting,
    comments: state.comments.list || [],
    articleID: state.article.data._id
  }));

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const [parent, setParent] = useState({ _id: null, _type: null });

  const comments = useMemo(() => {
    if (selectRedux.comments?.length) {
      return listToTree(selectRedux.comments)[0].children
    }
    return []
  }
    , [selectRedux.comments]);


  const callbacks = {
    // Открытие формы комментария
    handlerOpenForm: useCallback((type = "comment") => (id) => setParent({ _id: id, _type: type }), [store]),
    handlerSend: useCallback((text) => dispatch(commentsActions.sendComment({ parent, text }, callbacks.handlerLoad)), [parent, selectRedux.articleID]),
    handlerLoad: useCallback(() => dispatch(commentsActions.load(selectRedux.articleID)), [selectRedux.articleID])
  }

  const { t } = useTranslate();

  const renders = {
    item: useCallback(item => (
      <>
        <Comment item={item}
          onAdd={callbacks.handlerOpenForm("comment")}
          labelAdd={t('comment.answer')}
        />
        {item._id === parent._id && select.exists ? <CommentForm parent={parent} send={callbacks.handlerSend}
          onCancel={() => callbacks.handlerOpenForm("article")(selectRedux?.articleID)} /> : null}
        {item.children?.length ?
          <PaddingLayout padding={"large"}>
            <List list={item.children} renderItem={renders.item} isBorder={false} />
          </PaddingLayout>
          : null
        }
      </>
    ), [callbacks.handlerOpenForm, parent._id, t]),
  };

  useEffect(() => {
    setParent({ _id: selectRedux.articleID, _type: "article" });
  }, [selectRedux.articleID]);

  return (
    <Spinner active={selectRedux.waiting}>
      <ContentLayout  >
        <CommentHead total={selectRedux.total} />
        <List list={comments} renderItem={renders.item} isBorder={false} />
        <AuthCommentForm exists={select.exists} />
        {parent._id === selectRedux?.articleID && select.exists ? <CommentForm parent={parent} send={callbacks.handlerSend} /> : null}
      </ContentLayout>

    </Spinner>
  );
});
// onHandler={() => handlerOpenForm("article")(selectRedux?.articleID)}