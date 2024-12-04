<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fhuser:user:add']"
        >新增</el-button>
      </el-col>
      
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleMultiUnitUpdate"
       
        >修改全部单价</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['fhuser:user:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fhuser:user:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" v-if="true"/>
      <el-table-column label="账号" align="center" prop="account" />
      <el-table-column label="余额" align="center" prop="money" />
			<el-table-column label="状态" align="center" prop="status">
			  <template slot-scope="scope">
			    <dict-tag :options="dict.type.user_status" :value="scope.row.status"/>
			  </template>
			</el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fhuser:user:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fhuser:user:remove']"
          >删除</el-button>
          <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdateAddMoney(scope.row)"
          >增加余额</el-button>
           <el-button
            size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdateReduceMoney(scope.row)"
          >扣除余额</el-button>
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
  <!-- 添加或修改用户信息对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input v-model="form.money" placeholder="请输入余额"/>
        </el-form-item>
                <el-form-item label="状态" prop="status">
				          <el-select v-model="form.status" placeholder="请选择状态">
				            <el-option
				              v-for="dict in dict.type.user_status"
				              :key="dict.value"
				              :label="dict.label"
				:value="dict.value"
				            ></el-option>
				          </el-select>
									 
				        </el-form-item>
           
     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
  </el-dialog>


  <el-dialog :title="title" :visible.sync="openAddMoney" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form"  label-width="80px">
      <el-form-item label="增加余额" prop="money">
        <el-input v-model="form.money" type = "number" min = "0" placeholder="请输入要增加的余额"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"  placeholder="请输入备注"></el-input>
      </el-form-item>
      </el-form> 
      <el-form-item label="用户id" prop="id"  v-show="false">
        <el-input v-model="form.id"></el-input>
        </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormAddMoney">确 定</el-button>
        <el-button @click="cancelAddMoney">取 消</el-button>
      </div>
    </el-dialog>



      <el-dialog :title="title" :visible.sync="openReduceMoney" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    
      <el-form-item label="扣除余额" prop="money">
        <el-input v-model="form.money"  type = "number" min = "0" placeholder="请输入要扣除的余额"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"  placeholder="请输入备注"></el-input>
      </el-form-item>
      </el-form>
      <el-form-item label="用户id" prop="id"  v-show="false">
        <el-input v-model="form.id"></el-input>
        </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormReduceMoney">确 定</el-button>
        <el-button @click="cancelReduceMoney">取 消</el-button>
      </div>
    </el-dialog>
    
    <el-dialog :title="title" :visible.sync="openStoreConfig" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="storerule" label-width="80px">
        
      <el-form-item label="门店编号" prop="storeNumber">
        <el-input v-model="form.storeNumber"  type = "number"  placeholder="请输入编号"></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="用户id" prop="ids"  v-show="false">
        <el-input v-model="form.ids"></el-input>
        </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormUpdateStoreNumber">确 定</el-button>
        <el-button @click="cancelOpenStoreConfig">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser, updateStoreNUmber,addScore ,reduceScore } from "@/api/fhuser/user";

export default {
  name: "User",
  dicts: ['vip_type','user_status','user_type','transfer_status','score_type'],
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
        // 表单参数
        form: {
          id:"",
      },
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      totalUsableScore: 0,
      totalDecreaseFrozenScore: 0,
      // 用户信息表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      hasSee:false,
      // vip等级时间范围
      daterangeCreateTime: [],
      openAddMoney:false,
      openReduceMoney:false,
      totalWithDrawFeeScore:0,
      totalWithDrawScore:0,
      totalFrozenScore:0,
      openStoreConfig:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        account: undefined,
        createTime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "id不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        userAvatar: [
          { required: true, message: "头像不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
      },
        // 表单校验
        storerule: {
        storeNumber: [
          { required: true, message: "编号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
   methods: {
    handleMultiUnitUpdate(){

    },

    cancelAddMoney(){
      this.openAddMoney = false;
      this.reset();
    },
    handleUpdateAddMoney(row) {
      this.reset();
       this.form.id=row.id;
      this.openAddMoney=true;
      this.title = "增加用户积分";
    },
    handleUpdateReduceMoney(row){
       this.reset();
      this.form.id=row.id;
      this.openReduceMoney=true;
      this.title = "扣除用户积分";
    },
    cancelReduceMoney(){
       this.openReduceMoney = false;
      this.reset();
    },
    cancelOpenStoreConfig(){
       this.openStoreConfig = false;
      this.reset();
    },
    submitFormAddMoney() {
    
    this.buttonLoading = true;
    // if (this.form.userId != null) {
      addScore(this.form).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.openAddMoney = false;
        this.getList();
      }).finally(() => {
        this.buttonLoading = false;
        this.openAddMoney = false;
      });
    // }

},

submitFormReduceMoney(){
 this.buttonLoading = true;
      reduceScore(this.form).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.openReduceMoney = false;
        this.getList();
      }).finally(() => {
        this.buttonLoading = false;
        this.openReduceMoney = false;
      });
},

submitFormUpdateStoreNumber(){
 this.buttonLoading = true;
      updateStoreNUmber(this.form).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.openStoreConfig = false;
        this.getList();
      }).finally(() => {
        this.buttonLoading = false;
        this.openStoreConfig = false;
      });
},
    /** 查询用户信息列表 */
    // getList() {
    //   this.loading = true;
    //   listBanner(this.queryParams).then(response => {
    //     this.bannerList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },

    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
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
        nickname: undefined,
        userAvatar: undefined,
        password: undefined,
        salt: undefined,
        mobile: undefined,
        vipType: undefined,
        certificationName: undefined,
        certificationCard: undefined,
        promoUrl: undefined,
        bankName: undefined,
        bankCard: undefined,
        wxName: undefined,
        wxUrl: undefined,
        wxAccount: undefined,
        zfbName: undefined,
        zfbUrl: undefined,
        zfbAccount: undefined,
        sysInviteCode: undefined,
        inviteCode: undefined,
        registerCode: undefined,
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
      this.title = "添加用户信息";
      this.hasSee=true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this. hasSee=false;
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      getUser(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    /** 修改按钮操作 */
    handleStoreUpdate() {
      this. hasSee=false;
      this.openStoreConfig=true;
      this.title ="修改门店编号";
      this.form.ids=this.ids
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addUser(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户信息编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delUser(ids);
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
      this.download('fhuser/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
