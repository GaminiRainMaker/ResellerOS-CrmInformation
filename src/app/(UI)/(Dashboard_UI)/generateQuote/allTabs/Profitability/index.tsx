'use client';
import React, {FC} from 'react';
import GroupingData from './Profitability';
import Bundle from './Bundle';

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
      <Bundle
        tableColumnDataShow={tableColumnDataShow}
        selectedFilter={selectedFilter}
        setShowUpdateLineItemModal={setShowUpdateLineItemModal}
        showUpdateLineItemModal={showUpdateLineItemModal}
        setShowBundleModal={setShowBundleModal}
        setSelectedRowData={setSelectedRowData}
        selectTedRowData={selectTedRowData}
        selectTedRowIds={selectTedRowIds}
        showBundleModal={showBundleModal}
        setSelectedRowIds={setSelectedRowIds}
      />
      <GroupingData
        tableColumnDataShow={tableColumnDataShow}
        selectedFilter={selectedFilter}
        setShowUpdateLineItemModal={setShowUpdateLineItemModal}
        showUpdateLineItemModal={showUpdateLineItemModal}
        selectTedRowData={selectTedRowData}
        setSelectedRowData={setSelectedRowData}
        setSelectedRowIds={setSelectedRowIds}
        selectTedRowIds={selectTedRowIds}
      />
    </>
  );
};

export default ProfitabilityMain;
