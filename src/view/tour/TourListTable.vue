<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>Tour list</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- hidden table for special use -->
        <el-drawer
                title="Tour classification"
                :visible.sync="drawer"
                :direction="direction"
        >
            <div class="special-area">
                <el-dropdown @command="filterSpecial" style="margin-bottom: 20px">
                    <!--                    <p>Current type:{{currentType === '' ? 'none' : currentType}}</p>-->
                    <el-button type="primary">
                        Select<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">Top Tours</el-dropdown-item>
                        <el-dropdown-item command="2">New Tours</el-dropdown-item>
                        <el-dropdown-item command="3">Popular Tours</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-table :data="specialTours" border class="table" ref="multipleTable" :stripe="true"
                          v-loading="loading">
                    <el-table-column prop="itemId" label="Tour id" width="150" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="name" label="name" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="Operation" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red"
                                       @click="deleteRecord(scope.row.id,scope.$index)">
                                delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-drawer>
        <!-- table -->
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectCountry" placeholder="counrtry" class="handle-select mr10">
                    <el-option key="1" label="USA" value="USA"></el-option>
                    <el-option key="2" label="India" value="India"></el-option>
                </el-select>
                <el-input v-model="selectName" placeholder="name key words" class="handle-input mr10"></el-input>
                <el-input v-model="selectDuration" placeholder="duration longer then"
                          class="handle-input mr10"></el-input>
                <el-button type="" icon="el-icon-zoom-in" @click="search">search</el-button>
                <el-button type="danger" icon="el-icon-close" @click="clearFilter">clear filter</el-button>
                <el-button type="success" icon="el-icon-zoom-in" @click="add">add</el-button>
                <el-button type="warning" icon="el-icon-refresh" @click="refresh">refresh</el-button>

                <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                    classification
                </el-button>
            </div>
            <el-table :data="tours" border class="table" ref="multipleTable" :stripe="true">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="Tour id" width="150">
                </el-table-column>
                <el-table-column prop="name" label="name" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="description" label="description(brief)" width="120"
                                 :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="details" label="description(detail)" :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column prop="duration" label="duration">
                </el-table-column>

                <el-table-column prop="country" label="country">
                </el-table-column>
                <el-table-column prop="countryArea" label="countryArea">
                </el-table-column>
                <el-table-column prop="detailsLink" label="detailsLink" :show-overflow-tooltip="true">
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
                        <el-button type="text" icon="el-icon-edit" @click="getTour(scope.row.id)">edit</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteTour(scope.row.id)"
                                   v-show="scope.row.status !== '3'">delete
                        </el-button>
                        <el-button type="text" icon="el-icon-upload" class="green" @click="uploadImg(scope.row.id)"
                                   v-show="scope.row.status !== '3'">upload Img
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="green" @click="waveData(scope.row.id)">wave
                            record
                        </el-button>
                        <el-button type="text" icon="el-icon-star-on" class="green" @click="doClassification(scope.row.id)"
                                   v-show="scope.row.status === '1'">
                            mark as
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- do classification -->
        <el-dialog title="classification" :visible.sync="classificationVisible" width="20%">
            <div class="info">
                <p> <strong>Select Tour id</strong>: {{classifiSelectId === '' ? "select error pleases try again" : classifiSelectId}}</p>
            </div>
            <el-dropdown @command="mark" style="margin-bottom: 20px">
                <!--                    <p>Current type:{{currentType === '' ? 'none' : currentType}}</p>-->
                <el-select v-model="markTo" placeholder="no">
                    <el-option key="1" label="Top Tours" value="1"></el-option>
                    <el-option key="2" label="New Tours" value="2"></el-option>
                    <el-option key="3" label="Popular Tours" value="3"></el-option>
                </el-select>
                <el-button type="success" @click="markAs(markTo,classifiSelectId)">mark</el-button>
            </el-dropdown>

        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="edit" :visible.sync="editVisible" width="50%">
            <el-form ref="editTour" :model="editTour" label-width="80px">
                <h4>Basic Information</h4>
                <el-form-item label="Tour id" prop="name">
                    <el-input v-model="editTour.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="Tour name" prop="name">
                    <el-input v-model="editTour.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editTour.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editTour.details"></el-input>
                </el-form-item>
                <el-form-item label="duration" prop="duration">
                    <el-input v-model="editTour.duration"></el-input>
                </el-form-item>
                <el-form-item label="max duration" prop="maxDuration">
                    <el-input v-model="editTour.maxDuration"></el-input>
                </el-form-item>
                <el-form-item label="country" prop="country">
                    <el-select v-model="editTour.country" placeholder="country" @change="selectArea">
                        <el-option key="1" label="India" value="India"></el-option>
                        <el-option key="2" label="USA" value="USA"></el-option>
                        <el-option key="3" label="France" value="France"></el-option>
                        <el-option key="4" label="Germany" value="Germany"></el-option>
                        <el-option key="5" label="Spain" value="Spain"></el-option>
                        <el-option key="6" label="Qatar" value="Qatar"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Area" prop="countryArea">
                    <el-select v-model="editTour.countryArea" placeholder="area">
                        <el-option v-for="item in currentOption" :key="item.id" :label="item.label"
                                   :value="item.content"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="details link" prop="detailsLink">
                    <el-input v-model="editTour.detailsLink"></el-input>
                </el-form-item>

                <el-form-item label="tour status" prop="status">
                    <el-select v-model="editTour.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="past price" prop="pPrice">
                    <el-input v-model="editTour.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editTour.cPrice"></el-input>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editTour.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="Accessibility" prop="hasAccessibility">
                    <el-select v-model="editTour.hasAccessibility" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="allot pet" prop="isAllowedPet">
                    <el-select v-model="editTour.isAllowedPet" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has audio guide" prop="hasAudioGuide">
                    <el-select v-model="editTour.hasAudioGuide" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has tour guide" prop="hasTourGuide">
                    <el-select v-model="editTour.hasTourGuide" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="item description" prop="includeDescription">
                    <el-input v-model="editTour.includeDescription"></el-input>
                </el-form-item>

                <el-form-item v-for="(item, index) in editTour.includeItems" :label="'Include Service' + index"
                              :key="item.key" prop="includeItems">
                    <el-input v-model="item.content" @input="change"></el-input>
                    <el-button @click.prevent="removeItem(item)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">Cancel</el-button>
                    <el-button type="primary" @click="updateTour">Save</el-button>
                </span>
        </el-dialog>
        <!-- create form -->
        <el-dialog title="add new tour" :visible.sync="addVisible" width="50%">
            <el-form ref="addTour" :model="editTour" label-width="80px">
                <h4>Basic Information</h4>
                <el-form-item label="Tour name" prop="name">
                    <el-input v-model="editTour.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editTour.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editTour.details"></el-input>
                </el-form-item>
                <el-form-item label="duration" prop="duration">
                    <el-input v-model="editTour.duration"></el-input>
                </el-form-item>
                <el-form-item label="max duration" prop="maxDuration">
                    <el-input v-model="editTour.maxDuration"></el-input>
                </el-form-item>
                <el-form-item label="country" prop="country">
                    <el-select v-model="editTour.country" placeholder="country" @change="selectArea">
                        <el-option key="1" label="India" value="India"></el-option>
                        <el-option key="2" label="USA" value="USA"></el-option>
                        <el-option key="3" label="France" value="France"></el-option>
                        <el-option key="4" label="Germany" value="Germany"></el-option>
                        <el-option key="5" label="Spain" value="Spain"></el-option>
                        <el-option key="6" label="Qatar" value="Qatar"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Area" prop="countryArea">
                    <el-select v-model="editTour.countryArea" placeholder="area">
                        <el-option v-for="item in currentOption" :key="item.id" :label="item.label"
                                   :value="item.content"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="details link" prop="detailsLink">
                    <el-input v-model="editTour.detailsLink"></el-input>
                </el-form-item>

                <el-form-item label="tour status" prop="status">
                    <el-select v-model="editTour.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="past price" prop="pPrice">
                    <el-input v-model="editTour.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editTour.cPrice"></el-input>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editTour.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="Accessibility" prop="hasAccessibility">
                    <el-select v-model="editTour.hasAccessibility" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="allot pet" prop="isAllowedPet">
                    <el-select v-model="editTour.isAllowedPet" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has audio guide" prop="hasAudioGuide">
                    <el-select v-model="editTour.hasAudioGuide" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has tour guide" prop="hasTourGuide">
                    <el-select v-model="editTour.hasTourGuide" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="item description" prop="includeDescription">
                    <el-input v-model="editTour.includeDescription"></el-input>
                </el-form-item>

                <el-form-item v-for="(item, index) in editTour.includeItems" :label="'Include Service' + index"
                              :key="item.key" prop="includeItems">
                    <el-input v-model="item.content" @input="change"></el-input>
                    <el-button @click.prevent="removeItem(item)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">Cancel</el-button>
                    <el-button type="primary" @click="createTour">Create</el-button>
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
                specialTours: [],
                tours: [],
                tempTours: [],
                /**
                 * show hidden form
                 */
                editVisible: false,
                uploadImgVisible: false,
                addVisible: false,
                classificationVisible: false,
                editTour: {
                    id: '',
                    name: '',
                    description: '',
                    details: '',
                    duration: '',
                    maxDuration: '',
                    country: '',
                    countryArea: '',
                    detailsLink: '',
                    status: '',
                    pPrice: '',
                    cPrice: '',
                    type: '',
                    hasAccessibility: '',
                    isAllowedPet: '',
                    hasAudioGuide: '',
                    hasTourGuide: '',
                    includeDescription: '',
                    includeItems: [
                        {content: '', id: 'kjhkjhkj'}
                    ]
                },
                areasOption: [
                    [
                        {key: "1", label: 'rohtok', content: 'rohtok'},
                        {key: "2", label: 'rudrapur area', content: 'rudrapur area'},
                    ],
                    [
                        {key: "1", label: 'Detroit City', content: 'Detroit City'},
                        {key: "2", label: 'Lansing', content: 'Lansing'},
                        {key: "3", label: 'New York', content: 'New York'},
                        {key: "4", label: 'Ann Arbor', content: 'Ann Arbor'},
                        {key: "5", label: 'Toledo', content: 'Toledo'},
                    ],

                ],

                currentOption: [],
                fileList: [],
                url: '',

                /**
                 * filter data
                 */
                selectName: '',
                selectCountry: '',
                selectDuration: '',

                /**
                 *  drawer
                 */
                drawer: false,
                direction: 'rtl',
                loading: false,

                /**
                 * classification
                 */
                markTo: '',
                classifiSelectId:'',
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
                    url: '/api/tours',
                }).then(res => {
                    this.tours = res.data;
                    this.tempTours = res.data;
                }).catch(error => {
                    this.$message.error(error.message);
                })
            },
            selectArea() {
                if (this.editTour.country === 'India') {
                    this.currentOption = this.areasOption[0];
                } else if (this.editTour.country === 'USA') {
                    this.currentOption = this.areasOption[1];
                }
                //clean
                this.editTour.countryArea = '';
            },
            addDomain() {
                this.editTour.includeItems.push({
                    value: '',
                    key: Date.now()
                });
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
             *  classification
             */
            filterSpecial(command) {
                console.log(command);
                this.$axios({
                    method: 'get',
                    url: '/api/special-list/tours/' + command
                }).then(res => {
                    console.log(res.data);
                    this.specialTours = res.data;
                })
            },
            deleteRecord(id, index) {
                this.loading = true;
                console.log(index);
                this.specialTours.splice(index, 1);
                this.$axios({
                    method: 'delete',
                    url: '/api/special-list/' + id
                }).then(res => {
                    this.loading = false;
                    console.log(res)
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                    }
                })
            },
            mark(command){
              this.markTo = command;
            },
            /**
             * get tour details
             */
            getTourDetail(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/tour/' + id,
                });
            },
            getTourIncludeItem(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/includeItem/' + id,
                });
            },
            getTour(id) {
                let self = this;
                this.$axios.all([this.getTourDetail(id), this.getTourIncludeItem(id)])
                    .then(this.$axios.spread(function (res1, res2) {
                        self.editTour = res1.data;
                        console.log(res2.data);
                        self.editTour.includeItems = res2.data;
                        self.$forceUpdate();
                        self.editVisible = true;
                    }))
            },

            /**
             * operation methods
             */
            removeItem(item) {
                console.log(item);
                if (item.id === null || item.id === '') return;
                let index = this.editTour.includeItems.indexOf(item)
                if (index !== -1) {
                    this.editTour.includeItems.splice(index, 1)
                }
                this.$axios({
                    method: 'delete',
                    url: '/api/includeItem/' + item.id
                }).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })

                this.$forceUpdate();

            },
            updateTour() {
                this.$axios({
                    method: 'put',
                    url: '/api/tour',
                    data: this.editTour
                }).then(res => {
                    console.log(res);
                    this.$message.success(res.msg);
                    this.getData();
                    this.getTour(this.editTour.id);
                }).catch(error => {
                    this.$message.error("system error, pleases try later");
                })
            },
            waveData(id) {
                this.$confirm('This operation will permanently delete the record, cancel or continue?', 'notification', {
                    confirmButtonText: 'confirm',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: 'delete',
                        url: '/api/tour/' + id
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
            // logical delete
            deleteTour(id) {
                this.$axios({
                    method: 'put',
                    url: 'api/tour/' + id
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
            async markAs(type, id) {
                await this.$axios({
                    method: 'post',
                    url: '/api/special-list',
                    data: {
                        itemId: id,
                        status: type,
                    }
                }).then(res => {
                    this.$message.info(res.msg);
                })
            },
            doClassification(id){
              this.classificationVisible = true;
              this.classifiSelectId = id;
            },
            /**
             * filter methods
             */
            search() {
                this.tours = this.tempTours;

                if (this.selectCountry !== '') {
                    this.tours = this.tours.filter(item => {
                        return item.country === this.selectCountry;
                    })
                }
                if (this.selectName !== '') {
                    this.tours = this.tours.filter(item => {
                        console.log(item.name.indexOf('2'));
                        return item.name.indexOf(this.selectName) !== -1;
                    })
                }
                if (this.selectDuration !== '') {
                    this.tours = this.tours.filter(item => {
                        return parseInt(item.duration) >= parseInt(this.selectDuration);
                    })
                }
            },
            clearFilter() {
                this.tours = this.tempTours;
                this.selectCountry = '';
                this.selectName = '';
                this.selectDuration = '';
            },
            refresh() {
                this.getData();
            },
            /**
             *  add new tour
             */
            add() {
                this.resetForm('addTour');
                this.addVisible = true;
            },
            createTour() {
                let data = JSON.stringify(this.editTour);
                console.log(data);
                this.$axios({
                    method: 'post',
                    url: "/api/tour",
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


        },
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

    .special-area {
        text-align: center;
    }

    .info{
        margin-bottom: 30px;
    }
</style>
