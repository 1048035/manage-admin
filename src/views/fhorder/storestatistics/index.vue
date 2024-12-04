<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
     
 
       <el-form-item label="时间">
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="id" align="center" prop="id" v-if="true"/> -->
      <el-table-column label="门店编号" align="center" prop="number" />
      <el-table-column label="下单金额" align="center" prop="price" />
  
      <el-table-column label="时间" align="center" prop="statisticsSate" width="180">
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="[]"
          >审核</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="[]"
          >删除</el-button>
        </template>
      </el-table-column> -->
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
 
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"  disabled="disabled"/>
        </el-form-item>
        <el-form-item label="提现积分" prop="score">
          <el-input v-model="form.score" placeholder="请输入提现积分"  disabled="disabled"/>
        </el-form-item>
        <el-form-item label="实际到账积分" prop="realScore">
          <el-input v-model="form.score" placeholder="请输入实际到账积分"  disabled="disabled"/>
        </el-form-item>
        <el-form-item label="手续费" prop="feeScore">
          <el-input v-model="form.feeScore" placeholder="请输入手续费"  disabled="disabled"/>
        </el-form-item>
        <el-form-item label="审批备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入审批备注" />
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

import { list, get, del, update } from "@/api/fhorder/storestatistics";

export default {
  name: "User",
  dicts: ['vip_type','user_status','user_type','sell_score_type',"payment_check_status"],
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        nickname: undefined,
        phone: undefined,
        vipType: undefined,
        sysInviteCode: undefined,
        inviteCode: undefined,
        registerCode: undefined,
        createTime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
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
    /** 查询用户信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      list(this.queryParams).then(response => {
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
      get(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            update(this.form).then(response => {
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
        return del(ids);
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
