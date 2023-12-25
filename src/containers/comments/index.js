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
import { PaddingLayout } from '../../components/padding-layout';
import { CommentForm } from '../../components/comment-form';
import { ContentLayout } from '../../components/content-layout';
import commentsActions from '../../store-redux/comments/actions';
import { arrayToTree } from '../../utils/array-to-tree';

export const Comments = memo(() => {
  const store = useStore();
  const dispatch = useDispatch();
  const selectRedux = useSelectRedux(state => ({
    total: state.comments.total,
    waiting: state.comments.waiting,
    comments: state.comments.list,
    articleID: state.article.data._id
  }));

  const select = useSelector(state => ({
    exists: state.session.exists,
    userID: state.session.user._id,
    userName: state.session.user?.profile?.name,
  }));

  const [parent, setParent] = useState({ _id: null, _type: null });
  
  const callbacks = {
    // Открытие формы комментария
    handlerOpenForm: useCallback((type = "comment") => (id) => setParent({ _id: id, _type: type }), [store]),
    handlerSend: useCallback((text) => dispatch(commentsActions.sendComment({ parent, text }, select.userName)), [parent, selectRedux.articleID, select.userName]),
  }

  const { t } = useTranslate();

  const comments = useMemo(() => arrayToTree(selectRedux.comments, selectRedux.articleID), [selectRedux.comments, selectRedux.articleID])

  const renders = {
    item: useCallback(item => (
      <>
        <Comment item={item}
          onAdd={callbacks.handlerOpenForm("comment")}
          labelAdd={t('comment.answer')}
          userID={select.userID}
        />
        {item.children?.length ?
          <PaddingLayout padding={item.level < 5 ? "large" : "none"}>
            <>
              <List list={item.children} renderItem={renders.item} isBorder={false} />
              {item._id === parent._id ? <AuthCommentForm exists={select.exists} ><CommentForm parent={parent} send={callbacks.handlerSend}
                onCancel={() => callbacks.handlerOpenForm("article")(selectRedux?.articleID)} /></AuthCommentForm> : null}
            </>
          </PaddingLayout>
          :
          item._id === parent._id ? <AuthCommentForm exists={select.exists} ><CommentForm parent={parent} send={callbacks.handlerSend}
            onCancel={() => callbacks.handlerOpenForm("article")(selectRedux?.articleID)} /></AuthCommentForm> : null
        }

      </>
    ), [callbacks.handlerOpenForm, parent._id, t, select.exists, select.userID]),
  };

  useEffect(() => {
    setParent({ _id: selectRedux.articleID, _type: "article" });
  }, [selectRedux.articleID]);



  return (
    <Spinner active={selectRedux.waiting}>
      {!selectRedux.waiting && <ContentLayout  >
        <CommentHead total={selectRedux.total} />
        <List list={comments} renderItem={renders.item} isBorder={false} />

        {parent._id === selectRedux?.articleID ?
          <AuthCommentForm exists={select.exists} isFocus={false}>
            <CommentForm parent={parent}
              send={callbacks.handlerSend}
              title={"Новый комментарий"} /></AuthCommentForm> : null}
      </ContentLayout>
      }
    </Spinner>
  );
});