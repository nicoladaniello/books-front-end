import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/common/Pagination";
import SearchByButton from "../components/common/SearchByButton";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import { loadEntities, loadMore } from "../components/summaries/actions";
import SearchByPeriodModal from "../components/summaries/SearchByPeriodModal";
import { openModal } from "../components/summaries/slice";
import schema from "../settings/schemas/summaries";

const Summaries = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.summaries);
  const dispatch = useDispatch();

  /**
   * Initial fetch
   */
  useEffect(() => void dispatch(loadEntities()), [dispatch]);

  /**
   * UI
   */
  return (
    <View privateRoute>
      <div className="h-100 px-3" style={{ overflowY: "auto" }}>
        <div className="my-3">
          <SearchByButton
            input={state.search?.period}
            onClick={() =>
              dispatch(openModal({ modal: SearchByPeriodModal.modal }))
            }
          >
            {state.search?.period?.name || t("modules.period.select")}
          </SearchByButton>
        </div>
        <Table
          schema={schema}
          ids={state.ids}
          entities={state.entities}
          page={state.page}
          isLoading={state.isLoading}
        />
        <Pagination
          page={state.page}
          isLoading={state.isLoading}
          onLoadMore={() => dispatch(loadMore())}
        />
      </div>
      <SearchByPeriodModal />
    </View>
  );
};

export default Summaries;
