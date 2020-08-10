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
                <el-form ref="tour" :model="tour" label-width="80px">
                    <h4>Basic Information</h4>
                    <el-form-item label="Tour name" prop="name">
                        <el-input v-model="tour.name"></el-input>
                    </el-form-item>
                    <el-form-item label="description" prop="description">
                        <el-input v-model="tour.description"></el-input>
                    </el-form-item>
                    <el-form-item label="details" prop="details">
                        <el-input v-model="tour.details"></el-input>
                    </el-form-item>
                    <el-form-item label="duration" prop="duration">
                        <el-input v-model="tour.duration"></el-input>
                    </el-form-item>
                    <el-form-item label="max duration" prop="maxDuration">
                        <el-input v-model="tour.maxDuration"></el-input>
                    </el-form-item>
                    <el-form-item label="country" prop="country">
                        <el-select v-model="tour.country" placeholder="country" @change="selectArea">
                            <el-option key="1" label="India" value="India"></el-option>
                            <el-option key="2" label="USA" value="USA"></el-option>
                            <el-option key="3" label="France" value="France"></el-option>
                            <el-option key="4" label="Germany" value="Germany"></el-option>
                            <el-option key="5" label="Spain" value="Spain"></el-option>
                            <el-option key="6" label="Qatar" value="Qatar"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Area" prop="countryArea">
                        <el-select v-model="tour.countryArea" placeholder="area">
                            <el-option v-for="item in currentOption" :key="item.key" :label="item.label" :value="item.content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="details link" prop="detailsLink">
                        <el-input v-model="tour.detailsLink"></el-input>
                    </el-form-item>

                    <el-form-item label="tour status" prop="status">
                        <el-select v-model="tour.status" placeholder="1: active,2: inactive,3: deleted" >
                            <el-option key="1" label="active" value="1"></el-option>
                            <el-option key="2" label="inactive" value="2"></el-option>
                            <el-option key="3" label="deleted" value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="past price" prop="pPrice">
                        <el-input v-model="tour.pPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="current price" prop="cPrice">
                        <el-input v-model="tour.cPrice"></el-input>
                    </el-form-item>

                    <el-form-item label="type" prop="type" >
                        <el-select v-model="tour.type" placeholder="popular top-rate normal">
                            <el-option key="1" label="popular" value="3"></el-option>
                            <el-option key="2" label="top rate" value="2"></el-option>
                            <el-option key="3" label="normal" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <h4>Services</h4>
                    <el-form-item label="Accessibility" prop="hasAccessibility" >
                        <el-select v-model="tour.hasAccessibility" placeholder="no">
                            <el-option key="1" label="has" value="1"></el-option>
                            <el-option key="2" label="no" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="allot pet" prop="isAllowedPet" >
                        <el-select v-model="tour.isAllowedPet" placeholder="no">
                            <el-option key="1" label="yes" value="1"></el-option>
                            <el-option key="2" label="no" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="has audio guide" prop="hasAudioGuide">
                        <el-select v-model="tour.hasAudioGuide" placeholder="no">
                            <el-option key="1" label="has" value="1"></el-option>
                            <el-option key="2" label="no" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="has tour guide" prop="hasTourGuide">
                        <el-select v-model="tour.hasTourGuide" placeholder="no">
                            <el-option key="1" label="has" value="1"></el-option>
                            <el-option key="2" label="no" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="item description" prop="includeDescription">
                        <el-input v-model="tour.includeDescription"></el-input>
                    </el-form-item>

                    <el-form-item v-for="(item, index) in tour.includeItems" :label="'item ' + index" :key="item.key" prop="includeItems">
                        <el-input v-model="item.content"></el-input>
                        <el-button @click.prevent="removeItem(item)">delete</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addDomain">add</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createTour" >Create</el-button>
                        <el-button @click="resetForm('tour')" >Clean</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'itemForm',
        data() {
            return {
                tour:{
                    name:'',
                    description:'',
                    details:'',
                    duration:'',
                    maxDuration:'',
                    country:'',
                    countryArea:'',
                    detailsLink:'',
                    status:'',
                    cPrice:'',
                    pPrice:'',
                    type:'',
                    hasAccessibility:'',
                    isAllowedPet:'',
                    hasAudioGuide:'',
                    hasTourGuide:'',
                    includeDescription:'',
                    includeItems:[
                        {content:'',key:'kjhkjhkj'}
                    ]
                },
                areasOption:[
                    [
                        {key: "1",label: 'rohtok',content:'rohtok'},
                        {key: "2",label: 'rudrapur area',content:'rudrapur area'},
                    ],
                    [
                        {key: "1",label: 'Detroit City',content:'Detroit City'},
                        {key: "2",label: 'Lansing',content:'Lansing'},
                        {key: "3",label: 'New York',content:'New York'},
                        {key: "4",label: 'Ann Arbor',content:'Ann Arbor'},
                        {key: "5",label: 'Toledo',content:'Toledo'},
                    ],

                ],

                currentOption:[

                ]
            }
        },
        methods: {
            selectArea(){
                if (this.tour.country === 'India'){
                    this.currentOption = this.areasOption[0];
                } else if (this.tour.country === 'USA'){
                    this.currentOption = this.areasOption[1];
                }

                //clean
                this.tour.countryArea = '';
            },
            createTour(){
                let data = JSON.stringify(this.tour);
                console.log(data);
                this.$axios({
                    method:'post',
                    url: "/api/tour",
                    data:data
                }).then(res => {
                    console.log(res)
                    this.$message.success(res.msg);
                }).catch(error => {
                    this.$message.info(error);
                })
            },
            removeItem(item) {
                let index = this.tour.includeItems.indexOf(item)
                if (index !== -1) {
                    this.tour.includeItems.splice(index, 1)
                }
            },
            addDomain() {
                this.tour.includeItems.push({
                    value: '',
                    key: Date.now()
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.$message.success('success!');
            }
        }
    }
</script>

<style scoped>
    h4 {
        margin-bottom: 10px;
    }

</style>
