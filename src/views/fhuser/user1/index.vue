<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="vip等级" prop="vipType">
        <el-select v-model="queryParams.vipType" placeholder="请选择vip等级" clearable>
          <el-option
            v-for="dict in dict.type.vip_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="系统邀请码" prop="sysInviteCode">
        <el-input
          v-model="queryParams.sysInviteCode"
          placeholder="请输入系统邀请码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="用户邀请码" prop="inviteCode">
        <el-input
          v-model="queryParams.inviteCode"
          placeholder="请输入用户邀请码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被邀请码" prop="registerCode">
        <el-input
          v-model="queryParams.registerCode"
          placeholder="请输入被邀请码"
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
        <el-table-column type="expand" >
            <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="id" style="margin-bottom: 0px">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="昵称" style="margin-bottom: 0px" >
                                <span>{{ props.row.nickname }}</span>
                            </el-form-item>
                            <el-form-item label="头像" style="margin-bottom: 0px">
                                <span>
                                    <image-preview :src="props.row.userAvatar" :width="50" :height="50"/>
                                </span>
                            </el-form-item>
                            <el-form-item label="手机号" style="margin-bottom: 0px" >
                                <span>{{ props.row.mobile }}</span>
                            </el-form-item>
                            <el-form-item label="vip等级" style="margin-bottom: 0px">
                                <span>
                                        <dict-tag :options="dict.type.vip_type" :value="props.row.vipType"/>
                                </span>
                            </el-form-item>
                            <el-form-item label="实名姓名" style="margin-bottom: 0px" >
                                <span>{{ props.row.certificationName }}</span>
                            </el-form-item>
                            <el-form-item label="实名卡号" style="margin-bottom: 0px" >
                                <span>{{ props.row.certificationCard }}</span>
                            </el-form-item>
                            <el-form-item label="推广链接" style="margin-bottom: 0px" >
                                <span>{{ props.row.promoUrl }}</span>
                            </el-form-item>
                            <el-form-item label="银行卡姓名" style="margin-bottom: 0px" >
                                <span>{{ props.row.bankName }}</span>
                            </el-form-item>
                            <el-form-item label="银行卡号" style="margin-bottom: 0px" >
                                <span>{{ props.row.bankCard }}</span>
                            </el-form-item>
                            <el-form-item label="开户行" style="margin-bottom: 0px" >
                                <span>{{ props.row.bankOpen }}</span>
                            </el-form-item>
                            <el-form-item label="银行名称" style="margin-bottom: 0px" >
                                <span>{{ props.row.bankType }}</span>
                            </el-form-item>
                            <el-form-item label="微信姓名" style="margin-bottom: 0px" >
                                <span>{{ props.row.wxName }}</span>
                            </el-form-item>
                            <el-form-item label="微信收款码" style="margin-bottom: 0px" >
                               <image-preview :src="props.row.wxUrl" :width="50" :height="50"/>
                                <!-- <span>{{ props.row.wxUrl }}</span> -->
                            </el-form-item>
                            <el-form-item label="微信账号" style="margin-bottom: 0px" >
                                <span>{{ props.row.wxAccount }}</span>
                            </el-form-item>
                            <el-form-item label="支付宝姓名" style="margin-bottom: 0px" >
                                <span>{{ props.row.zfbName }}</span>
                            </el-form-item>
                            <el-form-item label="支付宝收款码" style="margin-bottom: 0px" >
                               <image-preview :src="props.row.zfbUrl" :width="50" :height="50"/>
                                <!-- <span>{{ props.row.zfbUrl }}</span> -->
                            </el-form-item>
                            <el-form-item label="支付宝账号" style="margin-bottom: 0px" >
                                <span>{{ props.row.zfbAccount }}</span>
                            </el-form-item>
                            <el-form-item label="系统邀请码" style="margin-bottom: 0px" >
                                <span>{{ props.row.sysInviteCode }}</span>
                            </el-form-item>
                            <el-form-item label="用户邀请码" style="margin-bottom: 0px" >
                                <span>{{ props.row.inviteCode }}</span>
                            </el-form-item>
                            <el-form-item label="被邀请码" style="margin-bottom: 0px" >
                                <span>{{ props.row.registerCode }}</span>
                            </el-form-item>
														<el-form-item label="状态" style="margin-bottom: 0px">
														    <span>
														            <dict-tag :options="dict.type.user_status" :value="props.row.status"/>
														    </span>
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
      <el-table-column label="id" align="center" prop="id" v-if="true"/>
      <el-table-column label="昵称" align="center" prop="nickname" />
      <el-table-column label="头像" align="center" prop="userAvatar" width="100">
          <template slot-scope="scope">
              <image-preview :src="scope.row.userAvatar" :width="50" :height="50"/>
          </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="mobile" />
      <el-table-column label="vip等级" align="center" prop="vipType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.vip_type" :value="scope.row.vipType"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="交易手续费比例" align="center" prop="tradeFeeRate" /> -->
      <el-table-column label="转让手续费比例" align="center" prop="transferFeeRate" />
      <!-- <el-table-column label="扫码返还比例" align="center" prop="returnFeeRate" /> -->
      <!-- <el-table-column label="扫码手续费比例" align="center" prop="sellTransferFeeRate" /> -->
      <!-- <el-table-column label="实名姓名" align="center" prop="certificationName" />
      <el-table-column label="实名卡号" align="center" prop="certificationCard" />
      <el-table-column label="推广链接" align="center" prop="promoUrl" />
      <el-table-column label="银行卡姓名" align="center" prop="bankName" />
      <el-table-column label="银行卡号" align="center" prop="bankCard" />
      <el-table-column label="微信姓名" align="center" prop="wxName" />
      <el-table-column label="微信收款码" align="center" prop="wxUrl" />
      <el-table-column label="微信账号" align="center" prop="wxAccount" />
      <el-table-column label="支付宝姓名" align="center" prop="zfbName" />
      <el-table-column label="支付宝收款码" align="center" prop="zfbUrl" />
      <el-table-column label="支付宝账号" align="center" prop="zfbAccount" /> -->
      <!-- <el-table-column label="系统邀请码" align="center" prop="sysInviteCode" /> -->
      <!-- <el-table-column label="用户邀请码" align="center" prop="inviteCode" />
      <el-table-column label="被邀请码" align="center" prop="registerCode" /> -->
      <el-table-column label="可用充值积分" align="center" prop="rechargeScore" />
        <el-table-column label="冻结积分" align="center" prop="frozenScore" />
      <el-table-column label="可用积分" align="center" prop="usableScore" />
			<el-table-column label="状态" align="center" prop="status">
			  <template slot-scope="scope">
			    <dict-tag :options="dict.type.user_status" :value="scope.row.status"/>
			  </template>
			</el-table-column>
      <el-table-column label="转让状态" align="center" prop="transferStatus">
			  <template slot-scope="scope">
			    <dict-tag :options="dict.type.transfer_status" :value="scope.row.transferStatus"/>
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
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-form-item label="被邀请码" style="margin-bottom: 0px" >
                                <span>{{ 0 }}</span>
                            </el-form-item> -->
                            <!-- 总共冻结积分: <span>{{ totalUsableScore }}</span>
                            总共可用积分: <span>{{ totalDecreaseFrozenScore }}</span> -->
     <!--  <el-row :gutter="10" class="mb8">
      <el-col :span="5">
        总共冻结积分: {{ totalUsableScore }}
      </el-col>
      </el-row>
      <el-row :span="5">
        总共可用积分: {{ totalDecreaseFrozenScore }}
      </el-row> -->
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
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像">
          <image-upload v-model="form.userAvatar" :limit="1" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <!-- <el-form-item label="vip等级" prop="vipType">
          <el-select v-model="form.vipType" placeholder="请选择vip等级">
            <el-option
              v-for="dict in dict.type.vip_type"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="加速比例" prop="speedRate">
          <el-input-number v-model="form.speedRate"  placeholder="请输入加速比例，减速为负值" />
        </el-form-item> -->
        <!-- <el-form-item label="交易手续费比例" prop="tradeFeeRate">
          <el-input-number v-model="form.tradeFeeRate"  placeholder="请输入交易手续费比例" />
        </el-form-item> -->
        <el-form-item label="转让手续费比例" prop="transferFeeRate">
          <el-input-number v-model="form.transferFeeRate"  placeholder="请输入转让手续费比例" />
        </el-form-item>
        <el-form-item label="可用充值积分" prop="rechargeScore">
          <el-input v-model="form.rechargeScore" placeholder="请输入可用充值积分" />
        </el-form-item>
        <el-form-item label="冻结积分" prop="frozenScore">
          <el-input v-model="form.frozenScore" placeholder="请输入冻结积分" />
        </el-form-item>
        <el-form-item label="可用积分" prop="usableScore">
          <el-input v-model="form.usableScore" placeholder="请输入可用积分" />
        </el-form-item>
        <!-- <el-form-item label="扫码返还冻结积分比例" prop="returnFeeRate">
          <el-input-number v-model="form.returnFeeRate"  placeholder="请输入扫码返还比例" />
        </el-form-item>
        <el-form-item label="扫码扣除比例" prop="reduceUsableScoreRate">
          <el-input-number v-model="form.sellTransferFeeRate"  placeholder="请输入扫码扣除比例" />
        </el-form-item> -->
		
  
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
                <el-form-item label="转让通证状态" prop="transferStatus">
				          <el-select v-model="form.transferStatus" placeholder="请选择状态">
				            <el-option
				              v-for="dict in dict.type.transfer_status"
				              :key="dict.value"
				              :label="dict.label"
				:value="dict.value"
				            ></el-option>
				          </el-select>
									 
				        </el-form-item>
         <el-form-item label="被邀请码" prop="mobile" v-if="hasSee">
          <el-input v-model="form.registerCode" placeholder="请输入被邀请码" />
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
import { listUserOld, getUser, delUser, addUser, updateUser } from "@/api/fhuser/user";

export default {
  name: "User",
  dicts: ['vip_type','user_status','user_type','transfer_status'],
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
        mobile: undefined,
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
      listUserOld(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        // this.totalUsableScore = this.userList[0].totalUsableScore;
        // this.totalDecreaseFrozenScore = this.userList[0].totalDecreaseFrozenScore;
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
