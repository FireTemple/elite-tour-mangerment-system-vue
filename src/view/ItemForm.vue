<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>Add item page</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <h4>Basic Information</h4>
                    <el-form-item label="Operator">
                        <input type="text" disabled="" :value="form.userId" v-show="false">{{username}}
                    </el-form-item>
                    <el-form-item label="type">
                        <el-select v-model="form.type" placeholder="Type">
                            <el-option key="1" label="Tour" value="1"></el-option>
                            <el-option key="2" label="Hotel" value="2"></el-option>
                            <el-option key="3" label="Restaurant" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Kind">
                        <el-select v-model="form.kind" placeholder="Kind">
                            <el-option key="1" label="Kind1" value="1"></el-option>
                            <el-option key="2" label="Kind2" value="2"></el-option>
                            <el-option key="3" label="Kind3" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="smallInfo" label-width="80px">
                    <h4>Small Information</h4>
                    <el-form-item label="Item Type">
                        <el-select v-model="smallInfo.type" placeholder="Type">
                            <el-option key="1" label="popular" value="popular"></el-option>
                            <el-option key="2" label="topRate" value="topRate"></el-option>
                            <el-option key="3" label="standard" value="standard"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Image Url">
                        <el-input v-model="smallInfo.imgUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="Title">
                        <el-input v-model="smallInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Description">
                        <el-input v-model="smallInfo.des"></el-input>
                    </el-form-item>
                    <el-form-item label="Past Price" size="small">
                        <el-input v-model="smallInfo.pPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="Current Price" size="mini">
                        <el-input v-model="smallInfo.cPrice"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit2">Save This Part
                        </el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div></div>
        </div>

        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="brefSchedule" label-width="80px">
                    <h4>Brief schedule & address</h4>
                    <el-form-item label="Address">
                        <el-input v-model="brefSchedule.address"></el-input>
                    </el-form-item>
                    <h4>Schedule</h4>
                    <el-form-item label="Moday">
                        <el-select v-model="brefSchedule.mo" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Tuesday">
                        <el-select v-model="brefSchedule.tu" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Wednesday">
                        <el-select v-model="brefSchedule.we" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Thursday">
                        <el-select v-model="brefSchedule.th" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Friday">
                        <el-select v-model="brefSchedule.fr" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Saturday">
                        <el-select v-model="brefSchedule.sa" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Sunday">
                        <el-select v-model="brefSchedule.su" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit2">Save This Part
                        </el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div></div>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="des" label-width="80px">
                    <h4>Item description</h4>
                    <el-form-item label="Title">
                        <el-input v-model="des.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Title description">
                        <el-input v-model="des.titleDes"></el-input>
                    </el-form-item>
                    <el-form-item label="Include description">
                        <el-input v-model="des.includeDes"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit3">Save This Part
                        </el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div></div>
        </div>

        <div class="container">
            <el-row>
                <el-col :span="18">
                    <div class="form-box">
                        <el-form ref="form" :model="des" label-width="80px">
                            <h4>Item description</h4>
                            <el-form-item label="Title">
                                <el-input v-model="des.title"></el-input>
                            </el-form-item>
                            <el-form-item label="Title description">
                                <el-input v-model="des.titleDes"></el-input>
                            </el-form-item>
                            <el-form-item label="Include description">
                                <el-input v-model="des.includeDes"></el-input>
                            </el-form-item>
                            <el-form-item label="Items">
                                <el-input v-model="tempItem"></el-input>
                                <el-button type="primary" @click="addItem">Add</el-button>
                                <el-button type="primary" @click="deleteItem">delete last one</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit3">Save This Part
                                </el-button>
                                <el-button>Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="4">
                    <h2>Include items</h2>
                    <p v-for="item in includeItem">{{item}}</p>
                </el-col>
            </el-row>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="schedule" :model="scheduleDetailItem" label-width="80px">
                    <h4>Schedule{{schedule.length}}</h4>
                    <el-form-item label="Duration">
                        <el-input v-model="scheduleDetailItem.duration"></el-input>
                    </el-form-item>
                    <el-form-item label="Moday">
                        <el-select v-model="scheduleDetailItem.mo" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Tuesday">
                        <el-select v-model="scheduleDetailItem.tu" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Wednesday">
                        <el-select v-model="scheduleDetailItem.we" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Thursday">
                        <el-select v-model="scheduleDetailItem.th" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Friday">
                        <el-select v-model="scheduleDetailItem.fr" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Saturday">
                        <el-select v-model="scheduleDetailItem.sa" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Sunday">
                        <el-select v-model="scheduleDetailItem.su" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit4">Save This Part
                        </el-button>
                        <el-button type="primary" @click="saveSchedule">Save this schedule for this item
                        </el-button>
                        <el-button type="primary" @click="deleteSchedule">delete last one
                        </el-button>
                        <el-button type="primary" @click="addSchedule">add new one
                        </el-button>

                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="openingTime" label-width="80px">
                    <h4>Opening Time</h4>
                    <el-form-item label="Title">
                        <el-input v-model="openingTime.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Moday">
                        <el-select v-model="openingTime.mo" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Tuesday">
                        <el-select v-model="openingTime.tu" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Wednesday">
                        <el-select v-model="openingTime.we" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Thursday">
                        <el-select v-model="openingTime.th" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Friday">
                        <el-select v-model="openingTime.fr" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Saturday">
                        <el-select v-model="openingTime.sa" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Sunday">
                        <el-select v-model="openingTime.su" placeholder="duration">
                            <el-option v-for="item in scheduleItem" :key="item.id" :label="item.content"
                                       :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Save This Part
                        </el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'itemForm',
        data: function () {
            return {
                scheduleItem: [
                    {content: 'closed', id: '1'},
                    {content: '9:00AM - 10:00PM', id: '2'},
                    {content: '9:00AM - 5:00PM', id: '3'}
                ],
                username: 'Bohan',
                currentStep: 1,
                form: {
                    userId: '1',
                    type: '',
                    kind: ''
                },
                smallInfo: {
                    userId: '1',
                    itemId: '1111',
                    type: '',
                    imgUrl: '',
                    title: '',
                    des: '',
                    cPrice: '',
                    pPrice: ''
                },
                brefSchedule: {
                    userId: '1',
                    itemId: '1111',
                    address: '',
                    mo: '',
                    tu: '',
                    we: '',
                    th: '',
                    fr: '',
                    sa: '',
                    su: ''
                },
                des: {
                    userId: '1',
                    itemId: '1111',
                    title: '',
                    titleDes: '',
                    includeDes: '',
                },
                includeItem: [],
                tempItem: '',
                schedule: [],
                scheduleDetailItem: {
                    userId: '1',
                    itemId: '1111',
                    duration: '',
                    mo: '',
                    tu: '',
                    we: '',
                    th: '',
                    fr: '',
                    sa: '',
                    su: ''
                },
                openingTime: {
                    userId: '1',
                    itemId: '1111',
                    title: '',
                    mo: '',
                    tu: '',
                    we: '',
                    th: '',
                    fr: '',
                    sa: '',
                    su: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log(JSON.stringify(this.form));
                this.$message.success('Create success！');
                this.currentStep++;
            },
            onSubmit2() {
                console.log(JSON.stringify(this.form));
                this.$message.success('Save success！');
                this.currentStep++;
            },
            onSubmit3() {
                console.log(JSON.stringify(this.form));
                this.$message.success('Save success！');
                this.currentStep++;
            },
            onSubmit4() {
                console.log(JSON.stringify(this.scheduleDetailItem));

                this.$message.success('Save success！');
                this.currentStep++;
            },
            addItem() {
                this.includeItem.push(this.tempItem);
                this.tempItem = '';
                this.$message.success('add success！');
            },
            deleteItem() {
                if (this.includeItem.length === 0) {
                    this.$message.warning("No one inside!");
                    return;
                }
                this.includeItem.pop();
                this.$message.success('delete success！');
            },
            addSchedule() {
                this.$refs['schedule'].resetField();
                this.$message.success('clear success！');
            },
            saveSchedule() {
                this.schedule.push(this.scheduleDetailItem);
                this.$message.success('save success！');
            },
            deleteSchedule() {
                if (this.schedule.length === 0) {
                    this.$message.warning("No one inside!");
                    return;
                }
                this.schedule.pop();
                this.$message.success('delete success！');
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    h4 {
        margin-bottom: 10px;
    }

</style>
