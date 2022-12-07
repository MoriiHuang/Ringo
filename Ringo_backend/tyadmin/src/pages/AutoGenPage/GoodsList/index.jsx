import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { notification, Button, Col, Descriptions, Divider, Dropdown, Form, Input, Menu, message, Popconfirm, Popover, Row, Select, Tag, Transfer, Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import KeyOutlined from '@ant-design/icons/lib/icons/KeyOutlined';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import { addGoods, queryGoods, removeGoods, updateGoods, queryGoodsVerboseName, queryGoodsListDisplay, queryGoodsDisplayOrder} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryGoodsCategory, queryGoodsCategoryVerboseName} from '@/pages/AutoGenPage/GoodsCategoryList/service';import {queryUserProfile, queryUserProfileVerboseName} from '@/pages/AutoGenPage/UserProfileList/service';

import moment from 'moment';
const { Option } = Select;
import { BooleanFormItem, dealManyToManyFieldTags, fileUpload, twoColumns, richForm, richCol, dealPureSelectField, orderForm, exportExcelCurrent, exportExcelAll, getUpdateColumns, dealRemoveError, dealError, BooleanDisplay, dealDateTimeDisplay, dealManyToManyField, dealTime, deepCopy, fieldErrorHandle, getTableColumns, renderManyToMany, richTrans, dealForeignKeyField, renderForeignKey, fieldsLevelErrorHandle } from '@/utils/utils';
import 'braft-editor/dist/index.css'
const FormItem = Form.Item;
const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
 
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();
  const updateFormRef = useRef();

  const handleAdd = async fields => {
    const hide = message.loading('正在添加');

    try {
      await addGoods({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      return dealError(error, addFormRef, hide, "添加");
    }
  };

  const handleUpdate = async (value, current_id) => {
    const hide = message.loading('正在修改');

    try {
      await updateGoods(value, current_id);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      return dealError(error, updateFormRef, hide, "修改");
    }
  };

  const handleRemove = async selectedRows => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
      const ids = selectedRows.map(row => row.id).join(',');
      await removeGoods(ids);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide()
      return dealRemoveError(error, "删除");
    }
  };
 
  const dateFieldList = ["add_time"]
  const base_columns = [{
                             title: 'id',
                             
        hideInForm: true,
        hideInSearch: true,
        
                             
                             dataIndex: 'id',
                             valueType: 'digit',
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '物品属性',
                             
                             
                             dataIndex: 'property_type',
                             
                             rules: [
                                     {
                      required: true,
                      message: '物品属性为必填项',
                     },
                             ],
                             
                             valueEnum:{"0":"需求物品","1":"提供物品"}
                        },
                      {
                             title: '物品类别',
                             
                             
                             dataIndex: 'category',
                             
                             rules: [
                                     {
                      required: true,
                      message: '物品类别为必填项',
                     },
                             ],
                             
                        renderFormItem: (item, {value, onChange}) => {
                                          return dealForeignKeyField(item, value, onChange, categoryForeignKeyList);
                                  },
                        render: (text, record) => {
                              return renderForeignKey(text, categoryVerboseNameMap);
                            },
                             
                        },
                      {
                             title: '紧急度',
                             
                             
                             dataIndex: 'emergency',
                             
                             rules: [
                                     {
                      required: true,
                      message: '紧急度为必填项',
                     },
                             ],
                             
                             valueEnum:{"1":"不紧急","2":"比较紧急","3":"十万火急"}
                        },
                      {
                             title: '物品唯一编号',
                             
                             initialValue: "",
                             dataIndex: 'goods_sn',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '用户',
                             
                             
                             dataIndex: 'user',
                             
                             rules: [
                                     {
                      required: true,
                      message: '用户为必填项',
                     },
                             ],
                             
                        renderFormItem: (item, {value, onChange}) => {
                                          return dealForeignKeyField(item, value, onChange, userForeignKeyList);
                                  },
                        render: (text, record) => {
                              return renderForeignKey(text, userVerboseNameMap);
                            },
                             
                        },
                      {
                             title: '物品名',
                             
                             
                             dataIndex: 'name',
                             
                             rules: [
                                     {
                      required: true,
                      message: '物品名为必填项',
                     },
                             ],
                             
                             
                        },
                      {
                             title: '物品简短描述',
                             
                             
                             dataIndex: 'goods_brief',
                             valueType: 'textarea',
                             rules: [
                                     {
                      required: true,
                      message: '物品简短描述为必填项',
                     },
                             ],
                             
                             
                        },
                      {
                             title: '物品详细描述',
                             
        hideInSearch: true,
        
                             initialValue: "",
                             dataIndex: 'goods_desc',
                             valueType: 'textarea',
                             rules: [
                                     
                             ],
                             
                                                              customCol:richCol,
                                                              ellipsis: true,
renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                                  return richForm(form, rest.id);
                                },
                             
                        },
                      {
                             title: '添加时间',
                             
            hideInForm: true,
            
                             
                             dataIndex: 'add_time',
                             valueType: 'dateTime',
                             rules: [
                                     
                             ],
                             
                             
                        },
                          {
                              title: '操作',
                              dataIndex: 'option',
                              valueType: 'option',
                                    fixed: 'right',
          width: 100,
                              render: (text, record) => (
                                <>

                                  <EditOutlined title="编辑" className="icon" onClick={async () => {
                                   record.add_time = record.add_time === null ? record.add_time : moment(record.add_time);
                                    handleUpdateModalVisible(true);
                                    setUpdateFormValues(record);
                                  }} />
                                  <Divider type="vertical" />
                                  <Popconfirm
                                    title="您确定要删除物品信息吗？"
                                    placement="topRight"
                                    onConfirm={() => {
                                      handleRemove([record])
                                      actionRef.current.reloadAndRest();
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                  >
                                    <DeleteOutlined title="删除" className="icon" />
                                  </Popconfirm>
                                </>
                              ),
                            },];

  let cp = deepCopy(base_columns);

  const [formOrder, setFormOrder] = useState([]);

  useEffect(() => {
    queryGoodsDisplayOrder().then(r => {
      setFormOrder(r.form_order)
    })
  }, [])
  const table_columns = getTableColumns(cp);

  let order_cp = deepCopy(base_columns);
  const form_ordered = orderForm(formOrder, order_cp);

  const create_columns = [...form_ordered];
  const update_cp = deepCopy(form_ordered)
  const update_columns = getUpdateColumns(update_cp);

  const [columnsStateMap, setColumnsStateMap] = useState({});

  const [paramState, setParamState] = useState({});

  useEffect(() => {
    queryGoodsListDisplay().then(value => {
      setColumnsStateMap(value)
    })
  }, [])


   
                                const [categoryForeignKeyList, setCategoryForeignKeyList] = useState([]);
                                useEffect(() => {
                                queryGoodsCategory({all: 1}).then(value => {
                                     setCategoryForeignKeyList(value);
                                });
                                }, []);
                                const [categoryVerboseNameMap, setCategoryVerboseNameMap] = useState([]);
                                useEffect(() => {
                                queryGoodsCategoryVerboseName().then(value => {
                                    setCategoryVerboseNameMap(value);
                                });
                                }, []);
                                const [userForeignKeyList, setUserForeignKeyList] = useState([]);
                                useEffect(() => {
                                queryUserProfile({all: 1}).then(value => {
                                     setUserForeignKeyList(value);
                                });
                                }, []);
                                const [userVerboseNameMap, setUserVerboseNameMap] = useState([]);
                                useEffect(() => {
                                queryUserProfileVerboseName().then(value => {
                                    setUserVerboseNameMap(value);
                                });
                                }, []);

   
  return (
    <PageHeaderWrapper>
      <ProTable
        beforeSearchSubmit={(params => {
          dealTime(params, dateFieldList);
          return params;
        })}
        params={paramState}
        scroll={{ x: '100%' }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        headerTitle="物品信息表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => exportExcelAll(paramState, queryGoods, table_columns, '物品信息-All')}>
            <ExportOutlined /> 导出全部
          </Button>,
          <Input.Search style={{ marginRight: 20 }} placeholder="搜索物品信息" onSearch={value => {
            setParamState({
              search: value,
            });
            actionRef.current.reload();
          }} />,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      actionRef.current.reloadAndRest();
                    }
                    else if (e.key === 'export_current') {
                      exportExcelCurrent(selectedRows, table_columns, '物品信息-select')
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="export_current">导出已选</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          selectedRowKeys.length > 0 ? <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div> : false

        )}
        request={(params, sorter, filter) => queryGoods({ ...params, sorter, filter })}
        columns={table_columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          formRef={addFormRef}
          onSubmit={async value => {
            richTrans(value);
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          search={twoColumns}
          form={
            {
              labelCol: { span: 6 },
              labelAlign: 'left',
            }}
          columns={create_columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable
          formRef={updateFormRef}
          onSubmit={async value => {
            richTrans(value);
            const success = await handleUpdate(value, updateFormValues.id);

            if (success) {
              handleUpdateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          search={twoColumns}
          type="form"
          form={{
            initialValues: updateFormValues, labelCol: { span: 6 },
            labelAlign: 'left',
          }}
          columns={update_columns}
          rowSelection={{}}
        />
      </UpdateForm>
       
    </PageHeaderWrapper>
  );
};

export default TableList;