<template>
  <div
    class="_bg"
    style="height:100%;overflow:auto;background:#FAFAFA;"
  >
    <div style="width:1300px;margin: 0 auto;">
      <div
        class="_bg"
        style="font-size:16px;padding: 40px 0;display:flex;"
        :style="{ backgroundImage: 'url(' + preBg + ')' }"
      >
        <div style="width:100px;height:170px;text-align:center;margin-left:20px;"><img
            src="../../assets/menu_logo.png"
            style="width:auto;height:100%;"
          ></div>
        <div style="flex:1;margin-left:20px;">
          <div style="color:#868686;fong-size:16px;margin-top:16px;">作品编号:{{this.queryId}}</div>
          <div style="margin-top:30px;color:#333333;
    font-weight: 540;
    font-style: normal;
    font-size: 36px;
    color: black;">{{namechs}}</div>
          <div style="
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #FF6600;">{{nameen}}</div>
        </div>
      </div>
      <div style="padding: 10px 30px; 20px 0;background:white;margin-top:-20px;">
        <div
          v-for="item in configLists"
          :key="item.item"
        >
          <!-- 类型1：大标题 -->
          <div v-if="item.style === 1">
            <div class="main_title">
              <span class="_title1">{{item.show}}</span>
            </div>
          </div>
          <!-- 类型2：短文字 -->
          <div
            class="margin_left"
            v-else-if="item.style === 2"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}</div>
            <div
              v-if="item.value"
              class="text_value"
            >{{item.value}}</div>
            <div
              v-else
              class="text_value"
            >-</div>
          </div>
          <!-- 类型3：长文字 -->
          <div
            class="margin_left"
            v-else-if="item.style === 3"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class=" title_space"
            >{{item.show}}</div>
            <div class="text_value">{{item.value || '-'}}</div>
          </div>
          <!-- 类型4：数字 -->
          <div
            class="margin_left"
            v-else-if="item.style === 4"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}</div>
            <div class="text_value">{{item.value}}</div>
          </div>
          <!-- 类型5：日期 -->
          <div
            class="margin_left"
            v-else-if="item.style === 5"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}</div>
            <div class="text_value">{{item.value || '-'}}</div>
          </div>
          <!-- 类型6：纯图片列表 -->
          <div
            class="margin_left"
            v-else-if="item.style === 6"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}</div>
            <div
              v-for="v7 in item.value.image"
              :key="v7"
              style="margin: 10px 10px 0 0;"
            >
              <img
                :src="v7"
                alt=""
                style="width: 100%;"
              >
            </div>
          </div>
          <!-- 类型7：多张图片+1块文字 -->
          <div
            class="margin_left"
            v-else-if="item.style === 7"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}
            </div>
            <div class="text_value">{{item.value.text || '-'}}</div>
            <div style="margin-left:20px;">
              <div
                v-for="v7 in item.value.image"
                :key="v7"
                style="margin: 10px 10px 0 0;"
              >
                <img
                  :src="v7"
                  alt=""
                  style="width: auto;max-width:100%;"
                >
              </div>
            </div>
          </div>
          <!-- 类型8：每张图片一个名字(用于人物照片上传) -->
          <div
            class="margin_left"
            v-else-if="item.style === 8"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}
            </div>
            <div
              v-if="item.value"
              style="display:flex;margin-left:10px;"
            >
              <div
                v-for="(v8) in item.value"
                :key="v8.image"
                style="margin: 10px 10px 0 0;height: 280px;"
              >
                <div style="height:250px;">
                  <img
                    :src="v8.image"
                    alt=""
                    style="width: auto;height: 100%;"
                  >
                </div>
                <div style="width:100%;line-height:28px;text-align:center;">
                  <span style="margin-top:2px;">{{v8.text}}</span>
                </div>
              </div>
            </div>
            <div v-else>-</div>
            <!-- <div style="margin-left:10px;">
            <div
              v-for="(v8) in item.value"
              :key="v8.image"
              style="margin: 10px 0px 0 10px;"
            >
              <div>
                <img
                  :src="v8.image"
                  alt=""
                  style="width: auto;max-width:100%;"
                >
              </div>
              <div style="width:100%;line-height:28px;text-align:center;">
                <span style="margin-top:2px;">{{v8.text}}</span>
              </div>
            </div>
          </div> -->
          </div>
          <!-- 类型9 PDF上传 -->
          <div
            class="margin_left"
            v-else-if="item.style === 9"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}</div>
            <div
              v-if="item.value"
              style="height: 40px;width: 100%;"
            >
              <Tooltip
                style="float:left;"
                content="点击浏览器打开"
              >
                <a
                  target="_blank"
                  :href="item.value"
                ><img
                    src="../../images/pdf.png"
                    alt=""
                    style="width:50px;"
                  ></a>
              </Tooltip>
              <a
                :href="item.value"
                target="_blank"
                style="float:left;margin-left:10px;margin-top:20px;"
              >
                <Button type="primary">打 开</Button>
              </a>
            </div>
            <div v-else>-</div>
            <!-- <Tooltip content="浏览器打开">
            <a
              target="_blank"
              :href="item.value"
              style="margin-left:20px;"
            ><svg
                t="1612611456625"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4789"
                width="20"
                height="20"
              >
                <path
                  d="M510.490112 64.301492c105.696274 0 201.38359 43.452651 270.725888 112.38972 69.38016 68.936045 111.985514 164.622338 111.985514 270.742261 0 94.016257-34.043351 180.919513-90.447988 247.345388-24.445762 28.834722-70.824045-7.93267-44.915979-38.438451 45.113477-53.055356 72.269977-120.745015 76.027557-191.353143L722.317565 464.987267c-1.266853 48.466851-7.952112 94.006024-18.593474 136.201032-6.882757 26.741038-40.940434 16.712637-35.105542-5.845125 10.658757-39.694047 16.929578-83.9766 18.175965-130.355907-145.190777 0-207.635991 0-353.041662 0 1.661849 46.379307 7.930623 90.661859 18.392906 130.355907 6.251378 23.813359-28.836769 30.916127-35.519981 3.758604-10.443863-40.940434-16.731056-86.487793-17.96107-134.11451L186.900226 464.987267c3.957125 73.119321 31.942503 139.126664 76.244498 191.353143 25.910113 30.506804-20.88568 67.273173-45.13292 38.020942C161.60512 627.928313 127.76336 541.448706 127.76336 447.432449c0-106.119923 42.621726-201.805192 111.965048-270.742261C309.108568 107.754143 404.775418 64.301492 510.490112 64.301492L510.490112 64.301492zM393.967258 693.667549 393.967258 693.667549 393.967258 538.717502c0-16.712637 13.171997-29.241998 29.649274-29.241998l0.649799 0 174.014242 0c16.296151 0 29.467125 12.529361 29.467125 29.241998l0 0.841158 0 154.109913 88.566128 0c16.297175 0 29.233811 12.951987 29.233811 29.248138 0 8.358365-2.927679 15.456017-8.347109 20.887726L531.627525 949.365162c-11.69025 11.69946-30.066783 11.69946-41.774429 0l-0.414439-0.830925L284.281113 743.804437c-11.275811-11.700483-11.275811-30.082132 0-41.780569 5.853311-5.429663 13.585413-8.355295 20.904099-8.355295l0.830925 0L393.967258 693.668573 393.967258 693.667549zM452.886159 569.802474 452.886159 569.802474l0 152.273079 0 0.840134c0 16.290011-13.171997 29.241998-29.269627 29.241998l-47.406706 0 134.528949 134.956691 134.535089-134.956691-46.361911 0-0.63138 0c-16.496719 0-29.469172-12.951987-29.469172-29.241998L568.811402 569.802474 452.886159 569.802474 452.886159 569.802474zM739.444641 218.056318 739.444641 218.056318c-2.494821-2.511193-5.022387-5.013177-7.93267-7.525394-14.217816 10.45205-29.249161 20.054755-45.113477 28.411073 21.084201 54.735625 34.256198 120.338762 35.920094 190.531428L833.865103 429.473425C829.691037 347.582323 794.188452 273.208429 739.444641 218.056318L739.444641 218.056318zM703.52557 187.558723 703.52557 187.558723c-20.487613-15.041578-42.205241-28.412097-66.018599-38.438451 9.178033 12.529361 17.959024 25.483394 25.691125 39.684838 3.539616 5.854335 6.467295 11.69946 9.178033 17.969257C683.036933 200.503547 693.479773 194.245006 703.52557 187.558723L703.52557 187.558723zM563.972187 127.808898 563.972187 127.808898c-11.92561-2.086521-23.813359-3.342118-35.93749-4.181229l0 124.512828c34.889625-2.087545 68.532863-9.197476 99.426477-20.47124 4.409426-2.094708 9.214872-3.76679 13.369495-5.437849-2.908236-5.429663-5.421476-11.274788-8.56405-16.288988C613.062232 170.846086 589.87923 143.680377 563.972187 127.808898L563.972187 127.808898zM492.728586 123.626645 492.728586 123.626645c-11.905144 0.840134-24.030299 2.095731-35.935444 4.181229-25.691125 15.872502-49.090045 43.037189-68.313875 78.133521-2.90926 5.0142-5.837962 10.859325-8.365528 16.288988 4.605901 1.671059 8.779967 3.343141 13.368472 5.437849 30.9325 11.273764 64.141856 18.383696 99.245352 20.47124L492.727563 123.626645 492.728586 123.626645zM383.040395 149.120272 383.040395 149.120272c-23.379477 10.026354-45.530986 23.396873-65.801658 38.438451 10.04375 6.686283 20.270672 12.944823 31.128975 19.21462 2.927679-6.269797 6.269797-12.114922 9.197476-17.969257C365.516276 174.603667 374.2768 161.649634 383.040395 149.120272L383.040395 149.120272zM289.449833 210.531947 289.449833 210.531947c-2.925632 2.511193-5.420453 5.013177-8.129144 7.525394-54.744835 55.152111-90.049922 129.526005-94.421486 211.417107l111.76448 0c1.662873-70.192665 15.032368-135.795802 35.919071-190.531428C318.71946 230.585679 303.669696 220.982974 289.449833 210.531947L289.449833 210.531947zM654.635069 254.409271 654.635069 254.409271c-5.022387 2.086521-10.028401 4.173043-14.634302 5.844102-35.087123 12.955056-72.901357 20.894889-111.966071 22.981411l0 146.238642 158.76084 0C685.132664 364.711446 673.426041 304.546158 654.635069 254.409271L654.635069 254.409271zM492.728586 283.234783 492.728586 283.234783c-39.080064-2.087545-76.659961-10.027377-111.765503-22.981411-5.006014-1.671059-9.81146-3.75758-14.832823-5.844102-18.790972 50.136887-30.2827 110.302175-32.377408 175.064155l158.975734 0L492.728586 283.234783 492.728586 283.234783z"
                  p-id="4790"
                ></path>
              </svg></a>
          </Tooltip> -->
          </div>
          <!-- 类型10 视频上传 -->
          <div
            class="margin_left"
            v-else-if="item.style === 10"
          >
            <div
              :class="item.must === 1 ? 'must_star2': ''"
              class="title_space"
            >{{item.show}}
            </div>
            <div style="margin-left:20px;">
              <video
                v-if="item.value"
                style="min-width:800px;width:40%;"
                controls
                :src="item.value"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评分modal -->
    <Modal
      v-model="scoreModal.show"
      draggable
      scrollable
      :closable="false"
      class="score_modal"
      :width="900"
    >
      <div
        slot="header"
        style="background:#f60;padding:4px 0;"
      >
        <span
          @click="scoreModal.show = false"
          style="cursor:pointer;"
        >
          <Icon
            style="font-size:22px;"
            type="ios-arrow-back"
          />
          <span>左侧隐藏</span>
        </span>
        <span style="margin-left:230px;">评分控制台（可拖动）</span>
      </div>
      <div class="score_content">
        <div class="header_tab">
          <div class="score_standard score_item">评审纬度</div>
          <div class="score_desc score_item">维度提示，但并不仅限于此</div>
          <div class="score_range score_item">分数范围</div>
          <div class="score_input score_item">评分</div>
        </div>
        <!-- s1 -->
        <div
          v-if="scroreStandard.s1"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s1.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s1.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s1.lowerLimit}} - {{scroreStandard.s1.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s1.lowerLimit"
              :max="scroreStandard.s1.point"
              v-model="scroreStandard.s1.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s1.value}}
            </span>
          </div>
        </div>
        <!-- s2 -->
        <div
          v-if="scroreStandard.s2"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s2.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s2.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s2.lowerLimit}} - {{scroreStandard.s2.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s2.lowerLimit"
              :max="scroreStandard.s2.point"
              v-model="scroreStandard.s2.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s2.value}}
            </span>
          </div>
        </div>
        <!-- s3 -->
        <div
          v-if="scroreStandard.s3"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s3.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s3.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s3.lowerLimit}} - {{scroreStandard.s3.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s3.lowerLimit"
              :max="scroreStandard.s3.point"
              v-model="scroreStandard.s3.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s3.value}}
            </span>
          </div>
        </div>
        <!-- s4 -->
        <div
          v-if="scroreStandard.s4"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s4.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s4.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s4.lowerLimit}} - {{scroreStandard.s4.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s4.lowerLimit"
              :max="scroreStandard.s4.point"
              v-model="scroreStandard.s4.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s4.value}}
            </span>
          </div>
        </div>
        <!-- s5 -->
        <div
          v-if="scroreStandard.s5"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s5.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s5.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s5.lowerLimit}} - {{scroreStandard.s5.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s5.lowerLimit"
              :max="scroreStandard.s5.point"
              v-model="scroreStandard.s5.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s5.value}}
            </span>
          </div>
        </div>
        <!-- s6 -->
        <div
          v-if="scroreStandard.s6"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s6.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s6.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s6.lowerLimit}} - {{scroreStandard.s6.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s6.lowerLimit"
              :max="scroreStandard.s6.point"
              v-model="scroreStandard.s6.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s6.value}}
            </span>
          </div>
        </div>
        <!-- s7 -->
        <div
          v-if="scroreStandard.s7"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s7.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s7.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s7.lowerLimit}} - {{scroreStandard.s7.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s7.lowerLimit"
              :max="scroreStandard.s7.point"
              v-model="scroreStandard.s7.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s7.value}}
            </span>
          </div>
        </div>
        <!-- s8 -->
        <div
          v-if="scroreStandard.s8"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s8.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s8.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s8.lowerLimit}} - {{scroreStandard.s8.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s8.lowerLimit"
              :max="scroreStandard.s8.point"
              v-model="scroreStandard.s8.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s8.value}}
            </span>
          </div>
        </div>
        <!-- s9 -->
        <div
          v-if="scroreStandard.s9"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s9.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s9.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s9.lowerLimit}} - {{scroreStandard.s9.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s9.lowerLimit"
              :max="scroreStandard.s9.point"
              v-model="scroreStandard.s9.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s9.value}}
            </span>
          </div>
        </div>
        <!-- s10 -->
        <div
          v-if="scroreStandard.s10"
          style="display:flex;"
        >
          <div class="score_standard score_item">{{scroreStandard.s10.title}}</div>
          <div class="score_desc score_desc_content">
            <div
              v-for="(v, index) in scroreStandard.s10.desc"
              :key="index"
            >{{v}}</div>
          </div>
          <div class="score_range score_item">{{scroreStandard.s10.lowerLimit}} - {{scroreStandard.s10.point}}</div>
          <div class="score_input score_item">
            <InputNumber
              :min="scroreStandard.s10.lowerLimit"
              :max="scroreStandard.s10.point"
              v-model="scroreStandard.s10.value"
              v-if="scoreModal.isEdit"
            />
            <span v-else>
              {{scroreStandard.s10.value}}
            </span>
          </div>
        </div>
        <div class="score_total">
          总分： <span>{{getScoreTotal}}</span></div>
        <div style="margin-top:20px;">
          <Input
            v-model="scoreModal.comment"
            type="textarea"
            :rows="4"
            :disabled="!scoreModal.isEdit"
            placeholder="输入评语"
          />
        </div>
      </div>
      <div
        style="text-align:center;margin:10px 0;"
        slot="footer"
      >
        <Button
          type="primary"
          size="large"
          class="reard_btn_o"
          :disabled="!isEditJudge"
          @click="saveProcess"
        >{{scoreModal.isEdit?'确定评分':'修改评分'}}</Button>
        <Button
          size="large"
          style="margin-left:40px;"
          @click="goBack"
        >退出评分页面</Button>
      </div>
    </Modal>
    <Affix
      :offset-top="clientHeight"
      v-show="!scoreModal.show"
    >
      <div
        @click="scoreModal.show = true"
        class="dianpin_btn"
      >点我评分
        <Icon
          style="font-size:30px;"
          type="ios-arrow-forward"
        />
      </div>
    </Affix>
  </div>
</template>

<script>
import { getMatchid } from '../../config/common'
export default {
  name: 'preview',
  computed: {
    getScoreTotal () {
      let total = 0
      let info = this.scroreStandard
      if (info.s1) {
        total = total + info.s1.value
      }
      if (info.s2) {
        total = total + info.s2.value
      }
      if (info.s3) {
        total = total + info.s3.value
      }
      if (info.s4) {
        total = total + info.s4.value
      }
      if (info.s5) {
        total = total + info.s5.value
      }
      if (info.s6) {
        total = total + info.s6.value
      }
      if (info.s7) {
        total = total + info.s7.value
      }
      if (info.s8) {
        total = total + info.s8.value
      }
      if (info.s9) {
        total = total + info.s9.value
      }
      if (info.s10) {
        total = total + info.s10.value
      }

      return total
    }
  },
  data () {
    return {
      clientHeight: document.documentElement.clientHeight / 2,
      queryId: this.$route.query.id,
      configLists: [],
      namechs: '',
      logoBg: require('../../assets/bkg.jpg'),
      preBg: require('../../assets/pre_bg.jpg'),
      nameen: '',
      scoreModal: {
        show: false,
        isEdit: false,
        comment: '',
        isComment: true
      },
      scroreStandard: {},
      workScore: {},
      phptTime: 0,
      isEditJudge: false
    }
  },
  async created () {
    if (this.queryId) {
      await this.getPhpTime()
      this.getMatchTime()
      this.getInfo()
      this.getScore()
    }
  },
  methods: {
    // 评委提交作品的打分(c30206)
    saveProcess () {
      if (!this.scoreModal.isEdit) {
        return this.scoreModal.isEdit = true
      }
      let info = this.scroreStandard
      let that = this
      let data = {
        op: 'c30206',
        id: this.queryId * 1,
        comment: this.scoreModal.comment
      }
      // 判断值
      let isTrue = true
      Object.keys(info).map(function (key, index) {
        if (info[key].value > info[key].point || info[key].value < info[key].lowerLimit) {
          that.$Message.warning(`【${info[key].title}】 超出分数范围，请修改！`)
          isTrue = false
        }
      })
      if (!isTrue) {
        return false
      }
      if (info.s1) {
        data.s1 = info.s1.value
      }
      if (info.s1) {
        data.s1 = info.s1.value
      }
      if (info.s2) {
        data.s2 = info.s2.value
      }
      if (info.s3) {
        data.s3 = info.s3.value
      }
      if (info.s4) {
        data.s4 = info.s4.value
      }
      if (info.s5) {
        data.s5 = info.s5.value
      }
      if (info.s6) {
        data.s6 = info.s6.value
      }
      if (info.s7) {
        data.s7 = info.s7.value
      }
      if (info.s8) {
        data.s8 = info.s8.value
      }
      if (info.s9) {
        data.s9 = info.s9.value
      }
      if (info.s10) {
        data.s10 = info.s10.value
      }
      this.$ajax(this, {
        data
      })
        .then(res => {
          if (res.result === 0) {
            this.$Message.success('修改成功！')
            this.scoreModal.isEdit = false
          } else {
            this.$Message.error(res.result)
          }
          // this.scoreModal.show = false
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 单个作品
    getInfo () {
      this.$ajax(this, {
        data: {
          op: 'c30203',
          id: this.queryId * 1
        }
      })
        .then(res => {
          this.namechs = res.data.namechs
          this.nameen = res.data.nameen
          this.configLists = res.data.items
          console.log('作品信息', res.data)
          document.title = res.data.namechs
          let info = res.data
          this.getStandard(info.c1, info.c2, info.c3, info.c4)
          // 时间转化
          this.configLists.map(item => {
            if (item.value === 'null' || item.value === null) {
              if (item.style === 4) {
                item.value = 0
              } else {
                item.value = ''
              }
            }
            if (item.style === 5) {
              if (item.value) {
                let date = new Date(parseInt(item.value * 1000))
                item.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
              }
            }
          })
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 获取评委对单个作品的评分(c30204)
    getScore () {
      this.$ajax(this, {
        data: {
          op: 'c30204',
          id: this.queryId * 1
        }
      })
        .then(res => {
          console.log('单个作品的评分', res)
          this.workScore = res.data
          this.scoreModal.comment = res.data.comment
          this.scoreModal.isEdit = false
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 获取当前类型的评审标准(c30205)
    getStandard (c1, c2, c3, c4) {
      let that = this
      this.$ajax(this, {
        data: {
          op: 'c30205',
          c1,
          c2,
          c3,
          c4
        }
      })
        .then(res => {
          console.log('类型的评审标准', res)
          let info = res.data
          // 计算分数范围
          Object.keys(info).map(function (key, index) {
            info[key]['lowerLimit'] = (info[key].point * 0.2).toFixed(0) * 1
            info[key]['value'] = that.workScore[key]
          })
          this.scroreStandard = res.data
          console.log(this.scroreStandard)
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    goBack () {
      window.close()
    },
    getPhpTime () {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'a10101'
          }
        })
          .then(res => {
            this.phptTime = res.t
            resolve('ok')
          })
      })
    },
    // 获取评分开始结束时间
    getMatchTime () {
      this.$ajax(this, {
        data: {
          op: 'y20205',
          matchid: getMatchid()
        }
      })
        .then(res => {
          console.log(res.data)
          console.log(this.phptTime)
          if (res.data) {
            if (res.data.scoreend > this.phptTime && this.phptTime > res.data.scorebegin) {
              this.isEditJudge = true
            } else {
              this.isEditJudge = false
            }
            console.log('this.isEditJudge', this.isEditJudge)
          }
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  }
}
</script>

<style  scoped>
._bg {
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  font-family: '思源黑体';
}
.main_title {
  width: 100%;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #ececec;
  margin-top: 20px;
}
.margin_left {
  margin-left: 36px;
}
.title_space {
  margin: 30px 0 6px 0;
  color: #333333;
  font-weight: bold;
  /* font-size: 18px; */
}
.text_value {
  padding-left: 20px;
  font-size: 14px;
  word-break: break-all;
  /* color: #666666; */
}
._title1 {
  display: inline-block;
  padding: 0 40px;
  background: #515a6e;
  color: white;
}
.dianpin_btn {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 102, 51, 1);
  color: white;
  text-align: center;
  line-height: 140px;
  font-size: 18px;
  cursor: pointer;
}
.score_content {
  margin: 10px;
}
.header_tab {
  display: flex;
  background: #f8f8f9;
  border-top: 1px solid #e8eaec;
  /* border-left: 1px solid #e8eaec; */
}
.score_standard {
  width: 120px;
  border-left: 1px solid #e8eaec;
}
.score_desc {
  width: 500px;
}
.score_desc_content {
  padding: 10px 10px;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.score_input {
  width: 130px;
}
.score_range {
  width: 110px;
}
.score_item {
  padding: 10px 0px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
}
.score_total {
  padding: 10px 20px;
  text-align: right;
  font-size: 18px;
  border: 1px solid #e8eaec;
}
</style>
<style>
.score_modal .ivu-modal-header {
  background: #f60;
  border: 1px solid #f60;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  font-size: 18px;
}
</style>
