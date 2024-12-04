<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
       
          @click="handleMultiUnitUpdate"
       
        >修改全部单价</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fhuser:userAccount:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['fhuser:userAccount:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['fhuser:userAccount:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fhuser:userAccount:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userAccountList" @selection-change="handleSelectionChange">
        <el-table-column type="expand" >
            <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="用户id" style="margin-bottom: 0px">
                                <span>{{ props.row.userId }}</span>
                            </el-form-item>
                            <el-form-item label="总充值积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.totalRechargeScore }}</span>
                            </el-form-item>
                            <el-form-item label="可用充值积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.rechargeScore }}</span>
                            </el-form-item>
                            <el-form-item label="累计积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.accumulateScore }}</span>
                            </el-form-item>
                            <el-form-item label="冻结积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.frozenScore }}</span>
                            </el-form-item>
                            <el-form-item label="可用积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.usableScore }}</span>
                            </el-form-item>
                            <el-form-item label="消费积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.consumeScore }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间" style="margin-bottom: 0px" >
                                <span>{{ parseTime(props.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                            </el-form-item>
                            <el-form-item label="更新时间" style="margin-bottom: 0px" >
                                <span>{{ parseTime(props.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                            </el-form-item>
                </el-form>
            </template>
        </el-table-column>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="userId" v-if="true"/>
      <el-table-column label="总充值积分" align="center" prop="totalRechargeScore" />
      <el-table-column label="可用充值积分" align="center" prop="rechargeScore" />
      <!-- <el-table-column label="累计积分" align="center" prop="accumulateScore" /> -->
      <el-table-column label="固定冻结积分" align="center" prop="frozenScore" />
      <el-table-column label="冻结积分" align="center" prop="decreaseFrozenScore" />
      <el-table-column label="可用积分" align="center" prop="usableScore" />
      <el-table-column label="消费积分" align="center" prop="consumeScore" />
      <el-table-column label="积分单价" align="center" prop="unitScore" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleUpdate(scope.row)"
     
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateUnitMoney(scope.row)"

          >设置单价</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
     
          >释放</el-button>
            <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdateAddMoney(scope.row)"
          >增加积分</el-button>
           <el-button
            size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdateReduceMoney(scope.row)"
          >扣除积分</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleReleaseLog(scope.row)"
          >通证明细</el-button>
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


    <!-- 通证明细对话框 -->
    <el-dialog :title="title" :visible.sync="openUserReleaseList" width="1000px" append-to-body>
      <el-table v-loading="loading" :data="userReleaseList">
      <el-table-column label="释放时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="今日释放积分" align="center" prop="userScore" />
      <el-table-column label="拼团释放积分" align="center" prop="groupScore" />
      <el-table-column label="组团释放积分" align="center" prop="indirectScore" />
    </el-table>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click=" cancelUserReleaseLog">取 消</el-button>
      </div>
    </el-dialog>

    
    <!-- 添加或修改用户积分对话框 -->
    <el-dialog :title="title" :visible.sync="openUnitMoney" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="积分单价" prop="unitScore">
          <el-input v-model="form.unitScore" placeholder="请输入积分单价" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormUnitMoney">确 定</el-button>
        <el-button @click=" cancelUnitMoney">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="openMultiUnitMoney" width="500px" append-to-body>
      <el-form ref="form" :model="form"  label-width="80px">
        <el-form-item label="全部修改积分单价" prop="unitScore">
          <el-input v-model="form.unitScore" placeholder="请输入积分单价" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormMultiUnitMoney">确 定</el-button>
        <el-button @click="cancelMultiUnit">取 消</el-button>
      </div>
    </el-dialog>

       <!-- 添加或修改用户积分对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="总充值积分" prop="totalRechargeScore">
          <el-input v-model="form.totalRechargeScore" placeholder="请输入总充值积分" />
        </el-form-item>
        <el-form-item label="可用充值积分" prop="rechargeScore">
          <el-input v-model="form.rechargeScore" placeholder="请输入可用充值积分" />
        </el-form-item>
        <!-- <el-form-item label="累计积分" prop="accumulateScore">
          <el-input v-model="form.accumulateScore" placeholder="请输入累计积分" />
        </el-form-item> -->
        <el-form-item label="固定冻结积分" prop="frozenScore">
          <el-input v-model="form.frozenScore" placeholder="请输入冻结积分" />
        </el-form-item>
        <el-form-item label="冻结积分" prop="decreaseFrozenScore">
          <el-input v-model="form.decreaseFrozenScore" placeholder="请输入冻结积分" />
        </el-form-item>
        <el-form-item label="可用积分" prop="usableScore">
          <el-input v-model="form.usableScore" placeholder="请输入可用积分" />
        </el-form-item>
        <el-form-item label="消费积分" prop="consumeScore">
          <el-input v-model="form.consumeScore" placeholder="请输入消费积分" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

                   <!-- 增加用户余额对话框 -->
    <el-dialog :title="title" :visible.sync="openAddMoney" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="增加积分" prop="money">
        <el-input v-model="form.money" placeholder="请输入要增加的积分"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormAddMoney">确 定</el-button>
        <el-button @click="cancelAddMoney">取 消</el-button>
      </div>
    </el-dialog>

      <el-dialog :title="title" :visible.sync="openReduceMoney" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="扣除积分" prop="money">
        <el-input v-model="form.money" placeholder="请输入要扣除的积分"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitFormReduceMoney">确 定</el-button>
        <el-button @click="cancelReduceMoney">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUserAccount, getUserReleaseList,getUserAccount, delUserAccount, addUserAccount,unitAccount, 
updateUserAccount,addAccount,reduceAccount,realseScore,editMultiUnit ,getConfigSys} from "@/api/fhuser/userAccount";

export default {
  name: "UserAccount",
  data() {
    return {
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
      // 用户积分表格数据
      userAccountList: [],
       // 用户通证明细数据
      userReleaseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openAddMoney:false,
      openReduceMoney:false,
      openUnitMoney:false,
      openMultiUnitMoney:false,
      openUserReleaseList:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined,
      },
      // 表单参数
      form: {
          userId:"",
         
      },
      // 表单校验
     rules: {
        userId: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        unitScore: [
          { required: true, message: "积分单价不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    submitFormMultiUnitMoney(){
        this.buttonLoading = true;
          // if (this.form.userId != null) {
            editMultiUnit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.openMultiUnitMoney = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          // }
    },
    handleMultiUnitUpdate(){
      this.openMultiUnitMoney = true;
      this.reset();
      getConfigSys().then(response => {
        // this.loading = false;
        this.form = response.data;
         this.openMultiUnitMoney = true;
      
      });
    },
     cancelMultiUnit(){
      this.openMultiUnitMoney = false;
      this.reset();
    },
    cancelUnitMoney(){
      this.openUnitMoney = false;
      this.reset();
    },
     handleUpdateAddMoney(row) {
      this.reset();
      const userId = row.userId || this.ids
       this.form.userId=userId;
      this.openAddMoney=true;
      this.title = "增加用户积分";
    },
   handleUpdateUnitMoney(row) {
      this.reset();
      const userId = row.userId || this.ids
       this.form.userId=userId;
      this.openUnitMoney=true;
      this.form.unitScore=row.unitScore;
      this.title = "设置积分单价";
    },
    cancelAddMoney(){
      this.openAddMoney = false;
      this.reset();
    },
    cancelUserReleaseLog(){
      this.openUserReleaseList = false;
      this.userReleaseList = [];
      this.reset();
    },
    handleUpdateReduceMoney(row){
       this.reset();
      const userId = row.userId || this.ids
      this.form.userId=userId;
      this.openReduceMoney=true;
      this.title = "扣除用户积分";
    },
    cancelReduceMoney(){
       this.openReduceMoney = false;
      this.reset();
    },
   submitFormUnitMoney() {
    
          this.buttonLoading = true;
          if (this.form.userId != null) {
            unitAccount(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.openUnitMoney = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
     
    },
    submitFormAddMoney() {
    
          this.buttonLoading = true;
          if (this.form.userId != null) {
            addAccount(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.openAddMoney = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
     
    },
    submitFormReduceMoney(){
       this.buttonLoading = true;
          if (this.form.userId != null) {
            reduceAccount(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.openReduceMoney = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
    },
    /** 查询用户积分列表 */
    getList() {
      this.loading = true;
      listUserAccount(this.queryParams).then(response => {
        this.userAccountList = response.rows;
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
        userId: undefined,
        totalRechargeScore: undefined,
        rechargeScore: undefined,
        accumulateScore: undefined,
        frozenScore: undefined,
        usableScore: undefined,
        consumeScore: undefined,
        createTime: undefined,
        updateTime: undefined,
        unitScore:undefined
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户积分";
    },
     /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const userId = row.userId || this.ids
      getUserAccount(userId).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改用户积分";
      });
    },
     /** 痛证明细按钮操作 */
     handleReleaseLog(row) {
      this.loading = true;
      this.reset();
      const userId = row.userId || this.ids
      getUserReleaseList(userId).then(response => {
        this.loading = false;
        this.userReleaseList = response.data;
        this.openUserReleaseList=true
        this.title = "通证明细";
      });
    },
   
    /** 提交按钮 */
    submitForm() {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
          this.buttonLoading = true;
          if (this.form.userId != null) {
            updateUserAccount(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addUserAccount(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$modal.confirm('是否确认释放用户冻结积分编号为"' + userIds + '"的数据项？').then(() => {
        this.loading = true;
        let data={"userId":userIds}
        return realseScore(data);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('fhuser/userAccount/export', {
        ...this.queryParams
      }, `userAccount_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
