import { useCallback, useMemo } from "react";
import "./style.css";
import { Button } from "../button/index.js";
import { getPages } from "../../../utils.js";
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";

export const Pagination = (props) => {
  const cn = bem('Pagination');
  const pages = useMemo(() => getPages(props.activePage, props.totalPages), [props.activePage, props.totalPages]);

  const handlerPages = useCallback(
    (page) => {
      props.onChangeParams(props.limit, page);
    },
    [props.onChangeParams],
  );

  const pagesList = useMemo(() => {
    return (
      <div className={cn()}>
        {pages.map((page, index) => {
          if (isFinite(page)) {
            return (
              <Button
                key={`${page}_${index}`}
                onClick={() => handlerPages(page)}
                active={props.activePage === page}
              >
                {page + 1}
              </Button>
            );
          }
          return <div className={cn('ellipsis')} key={`${page}_${index}`}>{page}</div>
        })}
      </div>
    );
  }, [props.activePage, handlerPages, pages]);
  return (
    <>
      {pagesList}
    </>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  activePage: PropTypes.number,
  onChangeParams: PropTypes.func,
  limit: PropTypes.number,
}
Pagination.defaultProps = {
  totalPages: 0,
  activePage: 1,
  onChangeParams: () => { },
  limit: 10
}