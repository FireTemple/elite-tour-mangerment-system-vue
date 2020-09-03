<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>Hotel list</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- table -->
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectCountry" placeholder="country" class="handle-select mr10">
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
            </div>

            <el-table :data="hotels" border class="table" ref="multipleTable" :stripe="true">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="hotel id" width="150" :show-overflow-tooltip="true">
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

                <el-table-column prop="cPrice" label="current price">
                </el-table-column>
                <el-table-column prop="pPrice" label="past price">
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
                        <el-button type="text" icon="el-icon-edit" @click="getHotel(scope.row.id)">edit</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteTour(scope.row.id)"
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
        <el-dialog title="edit hotel" :visible.sync="editVisible" width="70%">
            <el-form ref="editHotel" :model="editHotel" label-width="150px">
                <h4>Basic Information</h4>
                <el-form-item label="hotel name" prop="name">
                    <el-input v-model="editHotel.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editHotel.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editHotel.details"></el-input>
                </el-form-item>
                <el-form-item label="address" prop="address">
                    <el-input v-model="editHotel.address"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editHotel.cPrice"></el-input>
                </el-form-item>
                <el-form-item label="past price" prop="cPrice">
                    <el-input v-model="editHotel.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="details link" prop="detailsLink">
                    <el-input v-model="editHotel.detailsLink"></el-input>
                </el-form-item>

                <el-form-item label="hotel status" prop="status">
                    <el-select v-model="editHotel.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editHotel.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="has accessibility" prop="hasAccessibility">
                    <el-select v-model="editHotel.hasAccessibility" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has wifi" prop="hasWifi">
                    <el-select v-model="editHotel.hasWifi" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has TV" prop="hasTV">
                    <el-select v-model="editHotel.hasTV" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has pool" prop="hasPool">
                    <el-select v-model="editHotel.hasPool" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has fitness" prop="hasFitness">
                    <el-select v-model="editHotel.hasFitness" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="has restaurant" prop="hasRestaurant">
                    <el-select v-model="editHotel.hasRestaurant" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="allow pet" prop="allowPet">
                    <el-select v-model="editHotel.allowPet" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has restaurant" prop="hasParking">
                    <el-select v-model="editHotel.hasParking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has breakfast" prop="hasBreakfast">
                    <el-select v-model="editHotel.hasBreakfast" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Room Type</h4>
                <br>
                <el-form-item v-for="(item, index) in editHotel.rooms" :label="'Room: ' + (index + 1)"
                              :key="item.key" prop="rooms">
                    <p>type</p>
                    <el-input v-model="item.type" @input="change"></el-input>
                    <p>description</p>
                    <el-input v-model="item.des" @input="change"></el-input>
                    <p>has wifi</p>
                    <el-select v-model="item.hasWifi" placeholder="no" @input="change">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p>wifi description</p>
                    <el-input v-model="item.wifiDes" v-show="item.hasWifi === '1'" @input="change"></el-input>
                    <p>has TV</p>
                    <el-select v-model="item.hasTV" placeholder="no" @input="change">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p>TV description </p>
                    <el-input v-model="item.tvDes" v-show="item.hasTV === '1'" @input="change"></el-input>
                    <p>has safety Box</p>
                    <el-select v-model="item.hasSafetyBox" placeholder="no" @input="change">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p>safety Box description</p>
                    <el-input v-model="item.safteyBoxDes" v-show="item.hasSafetyBox === '1'" @input="change"></el-input>
                    <el-button @click.prevent="removeRoom(index)">delete</el-button>

                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

                <h4>Facilities</h4>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editHotel.facilitiesDes"></el-input>
                </el-form-item>
                <el-form-item v-for="(item, index) in editHotel.facilities" :label="'facilities: ' + (index + 1)"
                              :key="item.key" prop="des">
                    <el-input v-model="item.des" @input="change"></el-input>
                    <el-button @click.prevent="removeFacility(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addFacility">add</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">Cancel</el-button>
                    <el-button type="primary" @click="updateHotel">update</el-button>
            </span>
        </el-dialog>
        <!-- create form -->
        <el-dialog title="add new hotel" :visible.sync="addVisible" width="70%">
            <el-form ref="addHotel" :model="editHotel" label-width="150px">
                <h4>Basic Information</h4>
                <el-form-item label="hotel name" prop="name">
                    <el-input v-model="editHotel.name"></el-input>
                </el-form-item>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editHotel.description"></el-input>
                </el-form-item>
                <el-form-item label="details" prop="details">
                    <el-input v-model="editHotel.details"></el-input>
                </el-form-item>
                <el-form-item label="address" prop="address">
                    <el-input v-model="editHotel.address"></el-input>
                </el-form-item>
                <el-form-item label="current price" prop="cPrice">
                    <el-input v-model="editHotel.cPrice"></el-input>
                </el-form-item>
                <el-form-item label="past price" prop="cPrice">
                    <el-input v-model="editHotel.pPrice"></el-input>
                </el-form-item>
                <el-form-item label="details link" prop="detailsLink">
                    <el-input v-model="editHotel.detailsLink"></el-input>
                </el-form-item>

                <el-form-item label="hotel status" prop="status">
                    <el-select v-model="editHotel.status" placeholder="1: active,2: inactive,3: deleted">
                        <el-option key="1" label="active" value="1"></el-option>
                        <el-option key="2" label="inactive" value="2"></el-option>
                        <el-option key="3" label="deleted" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="type" prop="type">
                    <el-select v-model="editHotel.type" placeholder="popular top-rate normal">
                        <el-option key="1" label="popular" value="3"></el-option>
                        <el-option key="2" label="top rate" value="2"></el-option>
                        <el-option key="3" label="normal" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Services</h4>
                <el-form-item label="has accessibility" prop="hasAccessibility">
                    <el-select v-model="editHotel.hasAccessibility" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has wifi" prop="hasWifi">
                    <el-select v-model="editHotel.hasWifi" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has TV" prop="hasTV">
                    <el-select v-model="editHotel.hasTV" placeholder="no">
                        <el-option key="1" label="yes" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has pool" prop="hasPool">
                    <el-select v-model="editHotel.hasPool" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has fitness" prop="hasFitness">
                    <el-select v-model="editHotel.hasFitness" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="has restaurant" prop="hasRestaurant">
                    <el-select v-model="editHotel.hasRestaurant" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="allow pet" prop="allowPet">
                    <el-select v-model="editHotel.allowPet" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has restaurant" prop="hasParking">
                    <el-select v-model="editHotel.hasParking" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has breakfast" prop="hasBreakfast">
                    <el-select v-model="editHotel.hasBreakfast" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <h4>Room Type</h4>
                <br>
                <el-form-item v-for="(item, index) in editHotel.rooms" :label="'Room: ' + (index + 1)"
                              :key="item.key" prop="rooms">
                    <p>type</p>
                    <el-input v-model="item.type"></el-input>
                    <p>description</p>
                    <el-input v-model="item.des"></el-input>
                    <p>has wifi</p>
                    <el-select v-model="item.hasWifi" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p v-show="item.hasWifi === '1'">wifi description</p>
                    <el-input v-model="item.wifiDes" v-show="item.hasWifi === '1'"></el-input>
                    <p>has TV</p>
                    <el-select v-model="item.hasTV" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p  v-show="item.hasTV === '1'">TV description </p>
                    <el-input v-model="item.tvDes" v-show="item.hasTV === '1'"></el-input>
                    <p>has safety Box</p>
                    <el-select v-model="item.hasSafetyBox" placeholder="no">
                        <el-option key="1" label="has" value="1"></el-option>
                        <el-option key="2" label="no" value="2"></el-option>
                    </el-select>
                    <p v-show="item.hasSafetyBox === '1'">safety Box description</p>
                    <el-input v-model="item.safteyBoxDes" v-show="item.hasSafetyBox === '1'"></el-input>
                    <el-button @click.prevent="removeRoom(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">add</el-button>
                </el-form-item>

                <h4>Facilities</h4>
                <el-form-item label="description" prop="description">
                    <el-input v-model="editHotel.facilitiesDes"></el-input>
                </el-form-item>
                <el-form-item v-for="(item, index) in editHotel.facilities" :label="'facilities: ' + (index + 1)"
                              :key="item.key" prop="des">
                    <el-input v-model="item.des" @input="change"></el-input>
                    <el-button @click.prevent="removeFacility(index)">delete</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addFacility">add</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">Cancel</el-button>
                    <el-button type="primary" @click="createHotel">Create</el-button>
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
                hotels: [],
                tempHotels: [],

                /**
                 * show hidden form
                 */
                editVisible: false,
                uploadImgVisible: false,
                addVisible: false,

                editHotel: {
                    id: '',
                    name: '',
                    description: '',
                    details: '',
                    address: '',
                    cPrice: '',
                    pPrice: '',
                    detailsLink: '',
                    status: '',
                    type: '',
                    hasWifi: '',
                    hasTV: '',
                    hasPool: '',
                    hasFitness: '',
                    hasRestaurant: '',
                    allowPet: '',
                    hasAccessibility: '',
                    hasParking: '',
                    hasBreakfast: '',
                    facilitiesDes: '',
                    rooms: [
                        {
                            type: '',
                            des: '',
                            hasWifi: '',
                            wifiDes: '',
                            tvDes: '',
                            hasTV: '',
                            hasSafetyBox: '',
                            safteyBoxDes: ''
                        }
                    ],
                    facilities: [
                        {des: '', key: '1'}
                    ]
                },

                // for create rooms temple
                templeRoom: {},

                fileList: [],
                url: '',
                /**
                 * filter data
                 */
                selectName: '',
                selectCountry: '',
                selectDuration: '',

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
                    url: '/api/hotels',
                }).then(res => {
                    this.hotels = res.data;
                    this.tempHotels = res.data;
                }).catch(error => {
                    this.$message.error(error.message);
                })
            },
            addDomain() {
                this.editHotel.rooms.push({
                        type: '',
                        des: '',
                        hasWifi: '',
                        wifiDes: '',
                        tvDes: '',
                        hasTV: '',
                        hasSafetyBox: '',
                        safetyBoxDes: '',
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
             * get Hotel details
             */
            getHotelDetail(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/hotel/' + id,
                });
            },
            getHotelsRooms(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/rooms/' + id,
                });
            },
            getHotelsFacilities(id) {
                return this.$axios({
                    method: 'get',
                    url: '/api/facilities/' + id,
                });
            },

            getHotel(id) {
                let self = this;
                this.$axios.all([this.getHotelDetail(id), this.getHotelsRooms(id), this.getHotelsFacilities(id)])
                    .then(this.$axios.spread(function (res1, res2, res3) {
                        self.editHotel = res1.data;
                        self.editHotel.rooms = res2.data;
                        self.editHotel.facilities = res3.data;
                        self.editVisible = true;
                        self.$forceUpdate();
                        self.$forceUpdate();
                    }))
            },


            /**
             * operation methods
             */
            removeRoom(index) {
                if (index !== -1) {
                    this.editHotel.rooms.splice(index, 1)
                }
                if (!this.addVisible) {
                    this.$axios({
                        method: 'delete',
                        url: '/api/includeItem/' + this.editHotel.rooms[index].id
                    }).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                this.$forceUpdate();

            },
            removeFacility(index) {
                if (index !== -1) {
                    this.editHotel.facilities.splice(index, 1)
                }
                if (!this.addVisible) {
                    this.$axios({
                        method: 'delete',
                        url: '/api/' + this.editHotel.facilities[index].id
                    }).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    })
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
            addFacility() {
                this.editHotel.facilities.push({
                        content: '',
                        key: new Date()
                    }
                );
                this.$forceUpdate();
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
             *  add new hotel
             */
            add() {
                this.resetForm('addTour');
                this.addVisible = true;
            },
            createHotel() {
                let data = JSON.stringify(this.editHotel);
                console.log(data);
                this.$axios({
                    method: 'post',
                    url: "/api/hotel",
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
             *  update new hotel
             */
            updateHotel() {
                this.$axios({
                    method: 'put',
                    url: '/api/hotel',
                    data: this.editHotel
                }).then(res => {
                    this.$message.success(res.msg);
                    this.getData();
                    this.getHotel(this.editHotel.id);
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
