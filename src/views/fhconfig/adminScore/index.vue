<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fhconfig:adminScore:add']"
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
          v-hasPermi="['fhconfig:adminScore:edit']"
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
          v-hasPermi="['fhconfig:adminScore:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fhconfig:adminScore:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="adminScoreList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="expand" >
            <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="id" style="margin-bottom: 0px">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="总积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.totalScore }}</span>
                            </el-form-item>
                            <el-form-item label="剩余积分" style="margin-bottom: 0px" >
                                <span>{{ props.row.usableScore }}</span>
                            </el-form-item>
                          
                </el-form>
            </template>
        </el-table-column> -->
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" v-if="true"/>
      <el-table-column label="推广释放冻结积分比例" align="center" prop="promotionReleaseFrozenRate" />
      <el-table-column label="贡献值单价" align="center" prop="contributionRate" />
      <el-table-column label="提现手续费比例" align="center" prop="withDrawRate" />
      <el-table-column label="转让手续费比例" align="center" prop="transferFeeRate" />
      <el-table-column label="兑换区商品手续费比例" align="center" prop="oldReleaseFrozenRate" />
      <el-table-column label="兑换区商品赠送可用积分" align="center" prop="sendUsableScore" />
      <!-- <el-table-column label="总积分" align="center" prop="totalScore" />
      <el-table-column label="剩余积分" align="center" prop="usableScore" />
      <el-table-column label="释放积分状态" align="center" prop="releaseStatus">
			  <template slot-scope="scope">
			    <dict-tag :options="dict.type.release_status" :value="scope.row.releaseStatus"/>
			  </template>
			</el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fhconfig:adminScore:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fhconfig:adminScore:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改总积分配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="推广释放冻结积分比例" prop="promotionReleaseFrozenRate">
          <el-input-number v-model="form.promotionReleaseFrozenRate"  placeholder="请输入推广释放冻结积分比例" />
        </el-form-item>
        <el-form-item label="贡献值单价" prop="contributionRate">
          <el-input-number v-model="form.contributionRate"  placeholder="请输入贡献值单价" />
        </el-form-item>
        <el-form-item label="提现手续费比例" prop="withDrawRate">
          <el-input-number v-model="form.withDrawRate"  placeholder="请输入提现手续费比例" />
        </el-form-item>
        <el-form-item label="转让手续费比例" prop="transferFeeRate">
          <el-input-number v-model="form.transferFeeRate"  placeholder="请输入转让手续费比例" />
        </el-form-item>
        <el-form-item label="兑换区商品手续费" prop="oldReleaseFrozenRate">
          <el-input-number v-model="form.oldReleaseFrozenRate"  placeholder="请输入兑换区商品手续费" />
        </el-form-item>
        <el-form-item label="兑换区商品赠送可用积分" prop="sendUsableScore">
          <el-input-number v-model="form.sendUsableScore"  placeholder="请输入赠送可用积分" />
        </el-form-item>
        <!-- <el-form-item label="剩余积分" prop="usableScore">
          <el-input v-model="form.usableScore" placeholder="请输入剩余积分" />
        </el-form-item>
     
      <el-form-item label="释放积分状态" prop="releaseStatus">
				          <el-select v-model="form.releaseStatus" placeholder="请选择状态">
				            <el-option
				              v-for="dict in dict.type.release_status"
				              :key="dict.value"
				              :label="dict.label"
				:value="dict.value"
				            ></el-option>
				          </el-select>
									 
				        </el-form-item>
                 -->
              </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAdminScore, getAdminScore, delAdminScore, addAdminScore, updateAdminScore } from "@/api/fhconfig/adminScore";
export default {
dicts: ['release_status'],

  name: "AdminScore",
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
      // 总积分配置表格数据
      adminScoreList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        usableScore: [
          { required: true, message: "剩余积分不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询总积分配置列表 */
    getList() {
      this.loading = true;
      listAdminScore(this.queryParams).then(response => {
        this.adminScoreList = response.rows;
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
        totalScore: undefined,
        usableScore: undefined,
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
      this.title = "添加总积分配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      getAdminScore(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改总积分配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            updateAdminScore(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addAdminScore(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除总积分配置编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delAdminScore(ids);
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
      this.download('fhconfig/adminScore/export', {
        ...this.queryParams
      }, `adminScore_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
