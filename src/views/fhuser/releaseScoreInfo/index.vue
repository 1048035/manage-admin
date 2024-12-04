<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
 
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
    
      <el-form-item label="释放时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="[]"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="[]"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="[]"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fhshop:shopItem:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="shopItemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户手机号" align="center" prop="phone" />
      <el-table-column label="自己分红" align="center" prop="userScore" />
      <el-table-column label="直推释放" align="center" prop="groupScore" />
      <el-table-column label="层级释放" align="center" prop="indirectScore" />  
      <el-table-column label="释放日期" align="center" prop="releaseDate" />
      <el-table-column label="剩余冻结积分" align="center" prop="decreaseFrozenScore" />
   
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="[]"
          >审核</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="[]"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改商品信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
 
        <el-form-item label="支付手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入支付手机号名称" disabled="disabled" />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入金额" />
        </el-form-item>
      
        <el-form-item label="支付凭证图片">
          <image-upload v-model="form.pictures" :limit="5"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="审核状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in dict.type.payment_check_status"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listShopItem, getShopItem, delShopItem, addShopItem, updateShopItem } from "@/api/fhorder/releaseScoreLog";
import { listShopType } from "@/api/fhshop/shopType";
export default {
  name: "ShopItem",
  dicts: ['income_type','buy_status',"payment_check_status"],
  data() {
    return {
      baseUrl: process.env.VUE_APP_SRC_URL,
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 商品信息表格数据
      shopItemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 展示状态时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        typeId: undefined,
        itemTitle: undefined,
        showStatus: undefined,
        createTime: undefined,
      },
      queryTypeParams: {
        pageNum: 1,
        pageSize: 100,
      
      },
      options:[],
      //  options: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //   }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //   }, {
      //     value: '选项3',
      //     label: '蚵仔煎'
      //   }, {
        //   value: '选项4',
        //   label: '龙须面'
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }],
         value: 1,
      shopTypeList: [ {
          value: '1',
          label: '一般账户'
        }, {
          value: '2',
          label: '基本账户'
        }],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id: [
        //   { required: true, message: "id不能为空", trigger: "blur" }
        // ],
     
        // openBank: [
        //   { required: true, message: "开户行不能为空", trigger: "blur" }
        // ],
        // accountNumber: [
        //   { required: true, message: "收款账户号码不能为空", trigger: "blur" }
        // ],
        // accountName: [
        //   { required: true, message: "收款账户名称不能为空", trigger: "blur" }
        // ],
        // picture: [
        //   { required: true, message: "收款图片不能为空", trigger: "blur" }
        // ],
        status: [
          { required: true, message: "审核状态不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getTypeList();
  },
  methods: {
    getTypeList(){
        listShopType(this.queryTypeParams).then(response => {
        this.shopTypeList = response.rows;
        // console.log(this.shopTypeList)
        // for(var i=0;i<this.shopTypeList.length;i++){
        //   this.options.push({
        //     "lable":this.shopTypeList[i].shopTypeMes,
        //     "value":this.shopTypeList[i].id
        //   })
        // }
        // console.log(this.options)
      });
    },
    /** 查询商品信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listShopItem(this.queryParams).then(response => {
        this.shopItemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        typeId: undefined,
        typeMes: undefined,
        itemTitle: undefined,
        itemMes: undefined,
        itemIndexUrl: undefined,
        itemUrl: [],
        price: undefined,
        showStatus: undefined,
        createTime: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加收款账户信息";
  
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      getShopItem(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "审核支付凭证信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      console.log(this.form.itemUrl)

      this.$refs["form"].validate(valid => {
          if(Array.isArray(this.form.itemUrl)){
            if(this.form.itemUrl !=null&&this.form.itemUrl.length>0){
            //  let aa=this.form.itemUrl.split(",");
             let aa=this.form.itemUrl;
            
            let bb =aa.map((item) => {
                // console.log(item,this.baseUrl)
                let cc=item.split(this.baseUrl);
                // console.log(cc)
                if(cc.length==2){
                  return cc[1];
                }else{
                  return cc[0];
                }
              });
              this.form.itemUrl=bb;
           }
          }else{
      if(this.form.itemUrl !=null&&this.form.itemUrl.length>0){
                   let aa=this.form.itemUrl.split(",");
                  // let aa=this.form.itemUrl;
                  
                  let bb =aa.map((item) => {
                      // console.log(item,this.baseUrl)
                      let cc=item.split(this.baseUrl);
                      // console.log(cc)
                      if(cc.length==2){
                        return cc[1];
                      }else{
                        return cc[0];
                      }
                    });
                    this.form.itemUrl=bb;
                }
          }

           
           if(this.form.itemUrl == ''){
             this.form.itemUrl=[]
           }
        if (valid) {
          this.buttonLoading = true;
          // console.log(this.form)
          if (this.form.id != null) {
            
            updateShopItem(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addShopItem(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delShopItem(ids);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('fhshop/shopItem/export', {
        ...this.queryParams
      }, `shopItem_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
