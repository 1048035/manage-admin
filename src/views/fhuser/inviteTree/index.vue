<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="值" prop="treeName">
        <el-input
          v-model="queryParams.treeName"
          placeholder="请输入值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
	    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> 
 -->
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fhuser:inviteTree:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="inviteTreeList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="层级" prop="level" />
         <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="手机号" align="center" prop="mobile" />
      <!-- <el-table-column label="总充值积分" align="center" prop="totalRechargeScore" /> -->
      <el-table-column label="昵称" align="center" prop="nickname" />
      <!-- <el-table-column label="值" align="center" prop="treeName" /> -->
   
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
          <!-- <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fhuser:inviteTree:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['fhuser:inviteTree:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fhuser:inviteTree:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 添加或修改邀请树对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父id" prop="parentId">
          <treeselect v-model="form.parentId" :options="inviteTreeOptions" :normalizer="normalizer" placeholder="请选择父id" />
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="总充值积分" prop="totalRechargeScore">
          <el-input v-model="form.totalRechargeScore" placeholder="请输入总充值积分" />
        </el-form-item>
        <el-form-item label="下级总量(包含自己)" prop="accumulateScore">
          <el-input v-model="form.accumulateScore" placeholder="请输入下级总量(包含自己)" />
        </el-form-item>
        <el-form-item label="值" prop="treeName">
          <el-input v-model="form.treeName" placeholder="请输入值" />
        </el-form-item>
        <!-- <el-form-item label="部门id" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门id" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInviteTree, getInviteTree, delInviteTree, addInviteTree, updateInviteTree } from "@/api/fhuser/inviteTree";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "InviteTree",
  components: {
    Treeselect
  },
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 邀请树表格数据
      inviteTreeList: [],
      // 邀请树树选项
      inviteTreeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        userId: undefined,
        treeName: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "主键不能为空", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "父id不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        totalRechargeScore: [
          { required: true, message: "总充值积分不能为空", trigger: "blur" }
        ],
        accumulateScore: [
          { required: true, message: "下级总量(包含自己)不能为空", trigger: "blur" }
        ],
        treeName: [
          { required: true, message: "值不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "部门id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询邀请树列表 */
    getList() {
      this.loading = true;
      listInviteTree(this.queryParams).then(response => {
        this.inviteTreeList = this.handleTree(response.data, "id", "parentId");
        this.loading = false;
      });
    },
    /** 转换邀请树数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.treeName,
        children: node.children
      };
    },
	/** 查询邀请树下拉树结构 */
    getTreeselect() {
      listInviteTree().then(response => {
        this.inviteTreeOptions = [];
        const data = { id: 0, treeName: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "parentId");
        this.inviteTreeOptions.push(data);
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
        id: null,
        parentId: null,
        userId: null,
        totalRechargeScore: null,
        accumulateScore: null,
        treeName: null,
        deptId: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.id) {
        this.form.parentId = row.id;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加邀请树";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
	  this.loading = true;
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentId = row.id;
      }
      getInviteTree(row.id).then(response => {
	    this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改邀请树";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
		  this.buttonLoading = true;
          if (this.form.id != null) {
            updateInviteTree(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addInviteTree(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除邀请树编号为"' + row.id + '"的数据项？').then(() => {
        this.loading = true;
        return delInviteTree(row.id);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>
