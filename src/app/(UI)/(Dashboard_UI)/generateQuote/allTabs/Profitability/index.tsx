'use client';
import React, { FC } from 'react';
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
  isDeleteProfitabilityModal,
  setIsDeleteProfitabilityModal,
  showRemoveBundleLineItemModal,
  setShowRemoveBundleLineItemModal,
  collapseActiveKeys,
  setCollapseActiveKeys,
  validationTab
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
        isDeleteProfitabilityModal={isDeleteProfitabilityModal}
        setIsDeleteProfitabilityModal={setIsDeleteProfitabilityModal}
        showRemoveBundleLineItemModal={showRemoveBundleLineItemModal}
        setShowRemoveBundleLineItemModal={setShowRemoveBundleLineItemModal}
        collapseActiveKeys={collapseActiveKeys}
        setCollapseActiveKeys={setCollapseActiveKeys}
        validationTab={validationTab}
      />
    </>
  );
};

export default ProfitabilityMain;
