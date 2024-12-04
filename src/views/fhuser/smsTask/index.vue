<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
     
      <el-form-item label="用户id" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入用户id"
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
   

    <el-table v-loading="loading" :data="userFinanceList" @selection-change="handleSelectionChange">
     
      <el-table-column type="selection" width="55" align="center" />
      
      <el-table-column
                  label="订单ID"
                  prop="orderId">
                </el-table-column>
                <el-table-column
                  label="产品ID"
                  prop="pid">
                </el-table-column>
                <el-table-column
                  label="用户id"
                  prop="uid">
                </el-table-column>
                <el-table-column
                  label="国家编码"
                  prop="country">
                </el-table-column>
                <el-table-column label="平台" prop="remark">
                </el-table-column>
                <el-table-column
                  label="手机号"
                  prop="phone">
                </el-table-column>
                
                <el-table-column
                  label="验证码"
                  prop="code">
                </el-table-column>
                <el-table-column
                  label="消耗金额"
                  prop="price">
                </el-table-column>
                <el-table-column
                  label="扣除前余额"
                  prop="beforePrice">
                </el-table-column>
                
                <el-table-column
                  label="扣除后金额"
                  prop="remainPrice">
                </el-table-column>
             
                <el-table-column
                  label="创建时间"
                  prop="createTime">
                </el-table-column>
                <el-table-column
                  label="更新时间"
                  prop="updateTime">
                </el-table-column>
    
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fhuser:userFinance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fhuser:userFinance:remove']"
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
  </div>
</template>

<script>
import {listUserFinance, getUserFinance, delUserFinance, addUserFinance, updateUserFinance } from "@/api/fhuser/smsTask";

export default {
  name: "UserFinance",
  dicts: ['finance_operation', 'finance_status', 'finance_type','score_type'],
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
      // 用户财务表格数据
      userFinanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uid: undefined,
        mobile: undefined,
        financeType: undefined,
        financeOperation: undefined,
        financeStatus: undefined,
        financeScoreType: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户财务列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listUserFinance(this.queryParams).then(response => {
        this.userFinanceList = response.rows;
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
        uid: undefined,
        mobile: undefined,
        userScore: undefined,
        financeType: undefined,
        financeOperation: undefined,
        financeStatus: undefined,
        financeScoreType: undefined,
        createTime: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
      this.daterangeCreateTime = [];
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户财务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      getUserFinance(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改用户财务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            updateUserFinance(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addUserFinance(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户财务编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delUserFinance(ids);
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
      this.download('fhuser/userFinance/export', {
        ...this.queryParams
      }, `userFinance_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
