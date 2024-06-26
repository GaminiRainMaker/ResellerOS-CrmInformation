'use client';
import React, {FC} from 'react';
import GroupingData from './Profitability';

const ProfitabilityMain: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  setShowUpdateLineItemModal,
  showUpdateLineItemModal,
  selectTedRowData,
  setSelectedRowData,
  setShowBundleModal,
  selectTedRowIds,
  setSelectedRowIds,
  showBundleModal,
}) => {
  return (
    <>
      <GroupingData
        tableColumnDataShow={tableColumnDataShow}
        selectedFilter={selectedFilter}
        setShowUpdateLineItemModal={setShowUpdateLineItemModal}
        showUpdateLineItemModal={showUpdateLineItemModal}
        selectTedRowData={selectTedRowData}
        setSelectedRowData={setSelectedRowData}
        setSelectedRowIds={setSelectedRowIds}
        selectTedRowIds={selectTedRowIds}
        setShowBundleModal={setShowBundleModal}
        showBundleModal={showBundleModal}
      />
    </>
  );
};

export default ProfitabilityMain;
