<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>Restaurant list</el-breadcrumb-item>
            </el-breadcrumb>
        </div>



        <!-- table -->
        <div class="container">
            <div class="handle-box">
                <el-input v-model="selectPrice" placeholder="price under ..." class="handle-input mr10"></el-input>
                <el-input v-model="selectName" placeholder="name contains ...."
                          class="handle-input mr10"></el-input>
                <el-button type="" icon="el-icon-zoom-in" @click="search">search</el-button>
                <el-button type="danger" icon="el-icon-close" @click="clearFilter">clear filter</el-button>
                <el-button type="success" icon="el-icon-zoom-in" @click="add">add</el-button>
                <el-button type="warning" icon="el-icon-refresh" @click="refresh">refresh</el-button>
            </div>

            <el-table :data="ress" border class="table" ref="multipleTable" :stripe="true">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="restaurant id" width="150" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="name" label="name" width="120">
                </el-table-column>
                <el-table-column prop="description" label="description(brief)" width="120"
                                 :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="details" label="description(detail)" :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column prop="address" label="address" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="kind" label="food type">
                </el-table-column>

                <el-table-column prop="cPrice" label="current price">
                </el-table-column>
                <el-table-column prop="pPrice" label="past price">
                </el-table-column>
                <el-table-column prop="detailLink" label="detail link" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="status"
                        width="100"
                        :filters="[{ text: 'activated', value: '1' }, { text: 'deactivated', value: '2' },{text: 'deleted',value:'3'}]"
                        :filter-method="filterStatus"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="tagType(scope)"
                                disable-transitions>{{slotContent(scope)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Operation" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="getRes(scope.row.id)">edit</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteRes(scope.row.id)"
                                   v-show="scope.row.status !== '3'">delete
                        </el-button>
                        <el-button type="text" icon="el-icon-upload" class="green" @click="uploadImg(scope.row.id)"
                                   v-show="scope.row.status !== '3'">upload Img
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="green" @click="waveData(scope.row.id)">wave
                            record
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- edit-->
        <el-dialog title="edit restaurant" :visible.sync="editVisible" width="70%">
            <el-form ref="editRes" :model="editRes" label-width="300px">
                <h4>Basic Information</h4>
                <el-form-item label="Restaurant name" prop="name">
                    <el-input v-model="editRes.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editRes.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editRes.details"></el-input>
                </el-form-item>
                <el-form-item label="address" prop="address">
                    <el-input v-model="editRes.address"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editRes.cPrice"></el-input>
                </el-form-item>
                <el-form-item label="past price" prop="cPrice">
                    <el-input v-model="editRes.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="details link" prop="detailLink">
                    <el-input v-model="editRes.detailLink"></el-input>
                </el-form-item>

                <el-form-item label="restaurant status" prop="status">
                    <el-select v-model="editRes.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editRes.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="has accessibility" prop="hasAccessibility">
                    <el-select v-model="editRes.hasAccessibility" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="no somking" prop="hasWifi">
                    <el-select v-model="editRes.noSmoking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Instruction for no smoking" prop="detailLink">
                    <el-input v-model="editRes.noSmokingDes" v-show="editRes.noSmoking === '1'"></el-input>
                </el-form-item>

                <el-form-item label="has disabled" prop="hasTV">
                    <el-select v-model="editRes.hasDisabled" placeholder="no" >
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Instruction for disabled issue" prop="detailLink" v-show="editRes.hasDisabled === '1'">
                    <el-input v-model="editRes.disabledDes"></el-input>
                </el-form-item>


                <el-form-item label="has pool" prop="hasPool">
                    <el-select v-model="editRes.hasTransport" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Information for transport" prop="detailLink" v-show="editRes.hasTransport === '1'">
                    <el-input v-model="editRes.transportDes"></el-input>
                </el-form-item>

                <el-form-item label="has fitness" prop="hasFitness">
                    <el-select v-model="editRes.hasParking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Information for transport" prop="detailLink">
                    <el-input v-model="editRes.parkingDes"></el-input>
                </el-form-item>


                <el-form-item label="allow pet" prop="allowPet">
                    <el-select v-model="editRes.allowPet" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <h4>Opening time</h4>
                <br>
                <el-form-item v-for="(item, index) in editRes.openingTimeList" :label="'opening time duration: ' + (index + 1)"
                              :key="item.key" prop="openingTimeList">
                    <p>title</p>
                    <el-input v-model="item.title" @input="change"></el-input>
                    <p>Monday</p>
                    <el-input v-model="item.mo" @input="change"></el-input>
                    <p>Tuesday</p>
                    <el-input v-model="item.tu" @input="change"></el-input>
                    <p>Wednesday</p>
                    <el-input v-model="item.we" @input="change"></el-input>
                    <p>Thursday</p>
                    <el-input v-model="item.th" @input="change"></el-input>
                    <p>Friday</p>
                    <el-input v-model="item.fri" @input="change"></el-input>
                    <p>Saturday</p>
                    <el-input v-model="item.sa" @input="change"></el-input>
                    <p>Sunday</p>
                    <el-input v-model="item.su" @input="change"></el-input>
                    <el-button @click.prevent="removeOpeningTime(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

                <h4>Menus and dish</h4>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editRes.menuDes"></el-input>
                </el-form-item>
                <el-form-item v-for="(item, index) in editRes.menus" :label="'dish: ' + (index + 1)"
                              :key="item.key" prop="menus">
                    <el-input v-model="item.des" @input="change"></el-input>
                    <el-button @click.prevent="removeMenu(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addMenu">add</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">Cancel</el-button>
                    <el-button type="primary" @click="updateRes">update</el-button>
            </span>
        </el-dialog>
        <!-- create form -->
        <el-dialog title="add new restaurant" :visible.sync="addVisible" width="90%">
            <el-form ref="addRestaurant" :model="editRes" label-width="300px">
                <h4>Basic Information</h4>
                <el-form-item label="Restaurant name" prop="name">
                    <el-input v-model="editRes.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editRes.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editRes.details"></el-input>
                </el-form-item>
                <el-form-item label="address" prop="address">
                    <el-input v-model="editRes.address"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editRes.cPrice"></el-input>
                </el-form-item>
                <el-form-item label="past price" prop="cPrice">
                    <el-input v-model="editRes.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="details link" prop="detailLink">
                    <el-input v-model="editRes.detailLink"></el-input>
                </el-form-item>

                <el-form-item label="restaurant status" prop="status">
                    <el-select v-model="editRes.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editRes.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="has accessibility" prop="hasAccessibility">
                    <el-select v-model="editRes.hasAccessibility" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="no Somking" prop="hasWifi">
                    <el-select v-model="editRes.noSmoking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Instruction for no smoking" prop="noSmokingDes" v-show="editRes.noSmoking === '1'">
                    <el-input v-model="editRes.noSmokingDes"></el-input>
                </el-form-item>

                <el-form-item label="has disabled" prop="hasTV">
                    <el-select v-model="editRes.hasDisabled" placeholder="no" >
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Instruction for disabled issue" prop="disabledDes" v-show="editRes.hasDisabled === '1'" >
                    <el-input v-model="editRes.disabledDes"></el-input>
                </el-form-item>


                <el-form-item label="has transport" prop="hasPool">
                    <el-select v-model="editRes.hasTransport" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Information for transport" prop="transportDes"  v-show="editRes.hasTransport === '1'" >
                    <el-input v-model="editRes.transportDes"></el-input>
                </el-form-item>

                <el-form-item label="has parking" prop="hasParking">
                    <el-select v-model="editRes.hasParking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Information for transport" prop="parkingDes">
                    <el-input v-model="editRes.parkingDes"></el-input>
                </el-form-item>


                <el-form-item label="allow pet" prop="allowPet">
                    <el-select v-model="editRes.allowPet" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Opening time</h4>
                <br>
                <el-form-item v-for="(item, index) in editRes.openingTimeList" :label="'opening time duration: ' + (index + 1)"
                              :key="item.key" prop="openingTimeList">
                    <p>title</p>
                    <el-input v-model="item.title" @input="change"></el-input>
                    <p>Monday</p>
                    <el-input v-model="item.mo" @input="change"></el-input>
                    <p>Tuesday</p>
                    <el-input v-model="item.tu" @input="change"></el-input>
                    <p>Wednesday</p>
                    <el-input v-model="item.we" @input="change"></el-input>
                    <p>Thursday</p>
                    <el-input v-model="item.th" @input="change"></el-input>
                    <p>Friday</p>
                    <el-input v-model="item.fri" @input="change"></el-input>
                    <p>Saturday</p>
                    <el-input v-model="item.sa" @input="change"></el-input>
                    <p>Sunday</p>
                    <el-input v-model="item.su" @input="change"></el-input>
                    <el-button @click.prevent="removeOpeningTime(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

                <h4>Menus and dish</h4>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editRes.menuDes"></el-input>
                </el-form-item>
                <el-form-item v-for="(item, index) in editRes.menus" :label="'dish: ' + (index + 1)"
                              :key="item.key" prop="menus">
                    <el-input v-model="item.des" @input="change"></el-input>
                    <el-button @click.prevent="removeMenu(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addMenu">add</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">Cancel</el-button>
                    <el-button type="primary" @click="createRes">Create</el-button>
            </span>
        </el-dialog>

        <!-- upload image form -->
        <el-dialog title="upload img" :visible.sync="uploadImgVisible" width="80%">
            <el-upload
                    class="img-upload"
                    ref="upload"
                    action="api/file"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :limit="7"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <img :src="url" alt="error">

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelUpload">Cancel</el-button>
                    <el-button type="primary" @click="">Save</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'tourListTable',
        data() {
            return {
                ress: [],
                tempRess: [],

                /**
                 * show hidden form
                 */
                editVisible: false,
                uploadImgVisible: false,
                addVisible: false,

                editRes: {
                    id: '',
                    name: '',
                    description: '',
                    details: '',
                    kind: '',
                    address: '',
                    cPrice: '',
                    pPrice: '',
                    detailLink: '',
                    status: '',
                    type: '',
                    menuDes: '',
                    hasDisabled: '',
                    noSmoking: '',
                    hasParking: '',
                    hasTransport: '',
                    allowPet: '',
                    hasAccessibility: '',
                    disabledDes: '',
                    noSmokingDes: '',
                    parkingDes: '',
                    transportDes: '',
                    openingTimeList: [
                        {
                            title: '',
                            mo: '',
                            tu: '',
                            we: '',
                            th: '',
                            fri: '',
                            sa: '',
                            su: ''
                        }
                    ],
                    menus: [
                        {des: '', key: '1'}
                    ]
                },

                // for create rooms temple


                fileList: [],
                url: '',
                /**
                 * filter data
                 */
                selectName: '',
                selectPrice: '',

            }
        },
        created() {
            this.getData();
        },
        computed: {},
        methods: {

            /**
             * render methods
             */
            getData() {
                this.$axios({
                    method: 'get',
                    url: '/api/ress',
                }).then(res => {
                    this.ress = res.data;
                    this.tempRess = res.data;
                }).catch(error => {
                    this.$message.error(error.message);
                })
            },
            addDomain() {
                this.editRes.openingTimeList.push({
                        id: '',
                        title: '',
                        mo: '',
                        tu: '',
                        we: '',
                        th: '',
                        fri: '',
                        sa: '',
                        su: '',
                        key: new Date()
                    }
                );
                this.$forceUpdate();
            },
            filterStatus(value, row) {
                return row.status === value;
            },
            slotContent(scope) {
                if (scope.row.status === '1') return 'activated'
                else if (scope.row.status === '2') return 'deactivated'
                else if (scope.row.status === '3') return 'deleted'
                else return 'missing';
            },
            tagType(scope) {
                if (scope.row.status === '1') return 'success'
                else if (scope.row.status === '2') return 'info'
                else if (scope.row.status === '3') return 'danger'
                else return 'warning';
            },

            /**
             * get Restaurant details
             */
            getResDetail(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/res/' + id,
                });
            },
            getMenu(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/menu/' + id,
                });
            },
            getOpeningTime(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/opening-time/' + id,
                });
            },

            getRes(id) {
                let self = this;
                this.$axios.all([this.getResDetail(id), this.getMenu(id), this.getOpeningTime(id)])
                    .then(this.$axios.spread(function (res1, res2, res3) {
                        self.editRes = res1.data;
                        self.editRes.menus = res2.data;
                        self.editRes.openingTimeList = res3.data;
                        self.editVisible = true;
                        self.$forceUpdate();
                        self.$forceUpdate();
                    }))
            },


            /**
             * operation methods
             */
            removeOpeningTime(index) {

                if (!this.addVisible && this.editRes.openingTimeList[index].id) {
                    this.$axios({
                        method: 'delete',
                        url: '/api/opening-time/' + this.editRes.openingTimeList[index].id
                    }).then(res => {
                        this.$message.success(res.msg);
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                if (index !== -1) {
                    this.editRes.openingTimeList.splice(index, 1)
                }
                this.$forceUpdate();

            },
            removeMenu(index) {

                if (!this.addVisible &&  this.editRes.menus[index].id) {
                    this.$axios({
                        method: 'delete',
                        url: '/api/menu/' + this.editRes.menus[index].id
                    }).then(res => {
                        console.log(res);
                        this.$message.success(res.msg);
                    }).catch(error => {
                        console.log(error);
                    })
                }

                if (index !== -1) {
                    this.editRes.menus.splice(index, 1)
                }
                this.$forceUpdate();
            },
            waveData(id) {
                this.$confirm('This operation will permanently delete the record, cancel or continue?', 'notification', {
                    confirmButtonText: 'confirm',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: 'delete',
                        url: '/api/res/' + id
                    }).then(res => {
                        this.$message.success(res.msg);
                        this.getData();
                    }).catch(error => {
                        this.$message.error(error);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'already canceled'
                    });
                });
            },
            addMenu() {
                this.editRes.menus.push({
                        des: '',
                        key: new Date()
                    }
                );
                this.$forceUpdate();
            },
            // logical delete
            deleteRes(id) {
                this.$axios({
                    method: 'put',
                    url: '/api/res/' + id
                }).then(res => {
                    this.$message.success(res.msg);
                    this.getData();
                }).catch(error => {
                    console.log(error);
                })
            },
            cancelEdit() {
                this.editVisible = false;
                this.getData();
            },
            cancelUpload() {
                this.uploadImgVisible = false;
            },
            uploadImg() {
                this.uploadImgVisible = true;
                // this.getImg();
            },
            // test upload related
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess(response) {
                this.url = response
                console.log(this.url);
                this.$emit('onUpload')
                this.$message.warning('上传成功')
            },
            clear() {
                this.$refs.upload.clearFiles()
            },

            /**
             * filter methods
             */
            search() {
                this.ress = this.tempRess;
                if (this.selectName !== '') {
                    this.ress = this.ress.filter(item => {
                        return item.name.indexOf(this.selectName) !== -1;
                    })
                }
                if (this.selectPrice !== '') {
                    this.ress = this.ress.filter(item => {
                        return parseInt(item.cPrice) <= parseInt(this.selectPrice);
                    })
                }
            },
            clearFilter() {
                this.ress = this.tempRess;
                this.selectPrice = '';
                this.selectName = '';
            },
            refresh() {
                this.getData();
            },
            /**
             *  add new restaurant
             */
            add() {
                this.resetForm('addTour');
                this.addVisible = true;
            },
            createRes() {
                let data = JSON.stringify(this.editRes);
                console.log(data);
                this.$axios({
                    method: 'post',
                    url: "/api/res",
                    data: data
                }).then(res => {
                    this.$message.success(res.msg);
                    this.getData();
                }).catch(error => {
                    this.$message.info(error);
                })
            },
            cancelAdd() {
                this.addVisible = false;
            },
            /**
             *  update new restaurant
             */
            updateRes() {
                this.$axios({
                    method: 'put',
                    url: '/api/res',
                    data: this.editRes
                }).then(res => {
                    this.$message.success(res.msg);
                    this.getData();
                    this.getRes(this.editRes.id);
                }).catch(error => {
                    this.$message.error("system error, pleases try later");
                })
            },


            /**
             * common methods
             */
            resetForm(formName) {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                });
            },

            change() {
                this.$forceUpdate();
            },


        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .green {
        color: green;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
