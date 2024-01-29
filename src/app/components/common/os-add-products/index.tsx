import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {useEffect, useState} from 'react';
import {Form} from 'antd';
import {
  deleteProduct,
  getAllProduct,
  insertProduct,
  updateProductById,
} from '../../../../../redux/actions/product';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsDrawer from '../os-drawer';
import OsModal from '../os-modal';
import DeleteModal from '../os-modal/DeleteModal';
import AddProducts from './AddProducts';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [showAddProductModal, setShowAddProductModal] =
    useState<boolean>(false);
  const {data: ProductData, loading} = useAppSelector((state) => state.product);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [addProductType, setAddProductType] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [productData, setProductData] = useState<any>();
  const [form] = Form.useForm();

  const dropDownItemss = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          color="#EB445A"
          // onClick={deleteSelectedIds}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const deleteSelectedIds = async () => {
    const data = {id: deleteIds};
    await dispatch(deleteProduct(data));
    setTimeout(() => {
      dispatch(getAllProduct());
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const ProductColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Product name
        </Typography>
      ),
      dataIndex: 'product_code',
      key: 'product_code',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Product Code
        </Typography>
      ),
      dataIndex: 'product_code',
      key: 'product_code',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          List Price
        </Typography>
      ),
      dataIndex: 'list_price',
      key: 'list_price',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Product Family
        </Typography>
      ),
      dataIndex: 'product_family',
      key: 'product_family',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Product Description
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      width: 370,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          {' '}
        </Typography>
      ),
      dataIndex: 'actions',
      key: 'actions',
      width: 101,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setAddProductType('update');
              setOpen(true);
              setProductData(record);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const onFinish = () => {
    const productNewData = form.getFieldsValue();
    if (addProductType === 'insert') {
      dispatch(insertProduct(productNewData)).then(() => {
        dispatch(getAllProduct());
        setShowAddProductModal(false);
      });
    } else if (addProductType === 'update') {
      const obj: any = {
        id: productData?.id,
        ...productNewData,
      };
      dispatch(updateProductById(obj)).then(() => {
        dispatch(getAllProduct());
        setOpen(false);
      });
    }
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Products
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              <OsButton
                text="Add New Product"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setAddProductType('insert');
                  setShowAddProductModal((p) => !p);
                }}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>

        <OsTable
          columns={ProductColumns}
          dataSource={ProductData}
          // rowSelection={rowSelection}
          scroll
          loading={loading}
        />
      </Space>

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Product"
        description="Are you sure you want to delete this product?"
      />

      <OsModal
        body={<AddProducts form={form} />}
        width={696}
        open={showAddProductModal}
        onCancel={() => {
          setShowAddProductModal((p) => !p);
        }}
        onOk={onFinish}
        primaryButtonText="ADD"
        footerPadding={24}
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Add New Product</Typography>}
        placement="right"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE"
              clickHandler={() => form.submit()}
            />
          </Row>
        }
      >
        <AddProducts
          isDrawer
          productData={productData}
          onFinish={onFinish}
          form={form}
        />
      </OsDrawer>
    </>
  );
};

export default AddProduct;
