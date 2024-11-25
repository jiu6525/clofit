
<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>ReadMe</title><style>
/* cspell:disable-file */
/* webkit printing magic: print all background colors */
html {
	-webkit-print-color-adjust: exact;
}
* {
	box-sizing: border-box;
	-webkit-print-color-adjust: exact;
}

html,
body {
	margin: 0;
	padding: 0;
}
@media only screen {
	body {
		margin: 2em auto;
		max-width: 900px;
		color: rgb(55, 53, 47);
	}
}

body {
	line-height: 1.5;
	white-space: pre-wrap;
}

a,
a.visited {
	color: inherit;
	text-decoration: underline;
}

.pdf-relative-link-path {
	font-size: 80%;
	color: #444;
}

h1,
h2,
h3 {
	letter-spacing: -0.01em;
	line-height: 1.2;
	font-weight: 600;
	margin-bottom: 0;
}

.page-title {
	font-size: 2.5rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.75em;
}

h1 {
	font-size: 1.875rem;
	margin-top: 1.875rem;
}

h2 {
	font-size: 1.5rem;
	margin-top: 1.5rem;
}

h3 {
	font-size: 1.25rem;
	margin-top: 1.25rem;
}

.source {
	border: 1px solid #ddd;
	border-radius: 3px;
	padding: 1.5em;
	word-break: break-all;
}

.callout {
	border-radius: 3px;
	padding: 1rem;
}

figure {
	margin: 1.25em 0;
	page-break-inside: avoid;
}

figcaption {
	opacity: 0.5;
	font-size: 85%;
	margin-top: 0.5em;
}

mark {
	background-color: transparent;
}

.indented {
	padding-left: 1.5em;
}

hr {
	background: transparent;
	display: block;
	width: 100%;
	height: 1px;
	visibility: visible;
	border: none;
	border-bottom: 1px solid rgba(55, 53, 47, 0.09);
}

img {
	max-width: 100%;
}

@media only print {
	img {
		max-height: 100vh;
		object-fit: contain;
	}
}

@page {
	margin: 1in;
}

.collection-content {
	font-size: 0.875rem;
}

.column-list {
	display: flex;
	justify-content: space-between;
}

.column {
	padding: 0 1em;
}

.column:first-child {
	padding-left: 0;
}

.column:last-child {
	padding-right: 0;
}

.table_of_contents-item {
	display: block;
	font-size: 0.875rem;
	line-height: 1.3;
	padding: 0.125rem;
}

.table_of_contents-indent-1 {
	margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
	margin-left: 3rem;
}

.table_of_contents-indent-3 {
	margin-left: 4.5rem;
}

.table_of_contents-link {
	text-decoration: none;
	opacity: 0.7;
	border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

table,
th,
td {
	border: 1px solid rgba(55, 53, 47, 0.09);
	border-collapse: collapse;
}

table {
	border-left: none;
	border-right: none;
}

th,
td {
	font-weight: normal;
	padding: 0.25em 0.5em;
	line-height: 1.5;
	min-height: 1.5em;
	text-align: left;
}

th {
	color: rgba(55, 53, 47, 0.6);
}

ol,
ul {
	margin: 0;
	margin-block-start: 0.6em;
	margin-block-end: 0.6em;
}

li > ol:first-child,
li > ul:first-child {
	margin-block-start: 0.6em;
}

ul > li {
	list-style: disc;
}

ul.to-do-list {
	padding-inline-start: 0;
}

ul.to-do-list > li {
	list-style: none;
}

.to-do-children-checked {
	text-decoration: line-through;
	opacity: 0.375;
}

ul.toggle > li {
	list-style: none;
}

ul {
	padding-inline-start: 1.7em;
}

ul > li {
	padding-left: 0.1em;
}

ol {
	padding-inline-start: 1.6em;
}

ol > li {
	padding-left: 0.2em;
}

.mono ol {
	padding-inline-start: 2em;
}

.mono ol > li {
	text-indent: -0.4em;
}

.toggle {
	padding-inline-start: 0em;
	list-style-type: none;
}

/* Indent toggle children */
.toggle > li > details {
	padding-left: 1.7em;
}

.toggle > li > details > summary {
	margin-left: -1.1em;
}

.selected-value {
	display: inline-block;
	padding: 0 0.5em;
	background: rgba(206, 205, 202, 0.5);
	border-radius: 3px;
	margin-right: 0.5em;
	margin-top: 0.3em;
	margin-bottom: 0.3em;
	white-space: nowrap;
}

.collection-title {
	display: inline-block;
	margin-right: 1em;
}

.page-description {
    margin-bottom: 2em;
}

.simple-table {
	margin-top: 1em;
	font-size: 0.875rem;
	empty-cells: show;
}
.simple-table td {
	height: 29px;
	min-width: 120px;
}

.simple-table th {
	height: 29px;
	min-width: 120px;
}

.simple-table-header-color {
	background: rgb(247, 246, 243);
	color: black;
}
.simple-table-header {
	font-weight: 500;
}

time {
	opacity: 0.5;
}

.icon {
	display: inline-block;
	max-width: 1.2em;
	max-height: 1.2em;
	text-decoration: none;
	vertical-align: text-bottom;
	margin-right: 0.5em;
}

img.icon {
	border-radius: 3px;
}

.user-icon {
	width: 1.5em;
	height: 1.5em;
	border-radius: 100%;
	margin-right: 0.5rem;
}

.user-icon-inner {
	font-size: 0.8em;
}

.text-icon {
	border: 1px solid #000;
	text-align: center;
}

.page-cover-image {
	display: block;
	object-fit: cover;
	width: 100%;
	max-height: 30vh;
}

.page-header-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
}

.page-header-icon-with-cover {
	margin-top: -0.72em;
	margin-left: 0.07em;
}

.page-header-icon img {
	border-radius: 3px;
}

.link-to-page {
	margin: 1em 0;
	padding: 0;
	border: none;
	font-weight: 500;
}

p > .user {
	opacity: 0.5;
}

td > .user,
td > time {
	white-space: nowrap;
}

input[type="checkbox"] {
	transform: scale(1.5);
	margin-right: 0.6em;
	vertical-align: middle;
}

p {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}

.image {
	border: none;
	margin: 1.5em 0;
	padding: 0;
	border-radius: 0;
	text-align: center;
}

.code,
code {
	background: rgba(135, 131, 120, 0.15);
	border-radius: 3px;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-size: 85%;
	tab-size: 2;
}

code {
	color: #eb5757;
}

.code {
	padding: 1.5em 1em;
}

.code-wrap {
	white-space: pre-wrap;
	word-break: break-all;
}

.code > code {
	background: none;
	padding: 0;
	font-size: 100%;
	color: inherit;
}

blockquote {
	font-size: 1.25em;
	margin: 1em 0;
	padding-left: 1em;
	border-left: 3px solid rgb(55, 53, 47);
}

.bookmark {
	text-decoration: none;
	max-height: 8em;
	padding: 0;
	display: flex;
	width: 100%;
	align-items: stretch;
}

.bookmark-title {
	font-size: 0.85em;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 1.75em;
	white-space: nowrap;
}

.bookmark-text {
	display: flex;
	flex-direction: column;
}

.bookmark-info {
	flex: 4 1 180px;
	padding: 12px 14px 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.bookmark-image {
	width: 33%;
	flex: 1 1 180px;
	display: block;
	position: relative;
	object-fit: cover;
	border-radius: 1px;
}

.bookmark-description {
	color: rgba(55, 53, 47, 0.6);
	font-size: 0.75em;
	overflow: hidden;
	max-height: 4.5em;
	word-break: break-word;
}

.bookmark-href {
	font-size: 0.75em;
	margin-top: 0.25em;
}

.sans { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }
.code { font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace; }
.serif { font-family: Lyon-Text, Georgia, ui-serif, serif; }
.mono { font-family: iawriter-mono, Nitti, Menlo, Courier, monospace; }
.pdf .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK JP'; }
.pdf:lang(zh-CN) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK SC'; }
.pdf:lang(zh-TW) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK TC'; }
.pdf:lang(ko-KR) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK KR'; }
.pdf .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.pdf .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK JP'; }
.pdf:lang(zh-CN) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK SC'; }
.pdf:lang(zh-TW) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK TC'; }
.pdf:lang(ko-KR) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK KR'; }
.pdf .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.highlight-default {
	color: rgba(55, 53, 47, 1);
}
.highlight-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.highlight-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.highlight-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.highlight-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.highlight-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.highlight-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.highlight-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.highlight-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.highlight-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.highlight-default_background {
	color: rgba(55, 53, 47, 1);
}
.highlight-gray_background {
	background: rgba(241, 241, 239, 1);
}
.highlight-brown_background {
	background: rgba(244, 238, 238, 1);
}
.highlight-orange_background {
	background: rgba(251, 236, 221, 1);
}
.highlight-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.highlight-teal_background {
	background: rgba(237, 243, 236, 1);
}
.highlight-blue_background {
	background: rgba(231, 243, 248, 1);
}
.highlight-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.highlight-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.highlight-red_background {
	background: rgba(253, 235, 236, 1);
}
.block-color-default {
	color: inherit;
	fill: inherit;
}
.block-color-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.block-color-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.block-color-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.block-color-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.block-color-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.block-color-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.block-color-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.block-color-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.block-color-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.block-color-default_background {
	color: inherit;
	fill: inherit;
}
.block-color-gray_background {
	background: rgba(241, 241, 239, 1);
}
.block-color-brown_background {
	background: rgba(244, 238, 238, 1);
}
.block-color-orange_background {
	background: rgba(251, 236, 221, 1);
}
.block-color-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.block-color-teal_background {
	background: rgba(237, 243, 236, 1);
}
.block-color-blue_background {
	background: rgba(231, 243, 248, 1);
}
.block-color-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.block-color-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.block-color-red_background {
	background: rgba(253, 235, 236, 1);
}
.select-value-color-uiBlue { background-color: rgba(35, 131, 226, .07); }
.select-value-color-pink { background-color: rgba(245, 224, 233, 1); }
.select-value-color-purple { background-color: rgba(232, 222, 238, 1); }
.select-value-color-green { background-color: rgba(219, 237, 219, 1); }
.select-value-color-gray { background-color: rgba(227, 226, 224, 1); }
.select-value-color-transparentGray { background-color: rgba(227, 226, 224, 0); }
.select-value-color-translucentGray { background-color: rgba(0, 0, 0, 0.06); }
.select-value-color-orange { background-color: rgba(250, 222, 201, 1); }
.select-value-color-brown { background-color: rgba(238, 224, 218, 1); }
.select-value-color-red { background-color: rgba(255, 226, 221, 1); }
.select-value-color-yellow { background-color: rgba(253, 236, 200, 1); }
.select-value-color-blue { background-color: rgba(211, 229, 239, 1); }
.select-value-color-pageGlass { background-color: undefined; }
.select-value-color-washGlass { background-color: undefined; }

.checkbox {
	display: inline-flex;
	vertical-align: text-bottom;
	width: 16;
	height: 16;
	background-size: 16px;
	margin-left: 2px;
	margin-right: 5px;
}

.checkbox-on {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
}

.checkbox-off {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
}
	
</style></head><body><article id="8fd9ded8-33f7-4c84-9963-dd80093b4d39" class="page sans"><header><h1 class="page-title">ReadMe</h1><p class="page-description"></p></header><div class="page-body"><h1 id="89e2248f-fc32-4a4a-a49d-7575b2f57571" class="">소개</h1><p id="d5b2f612-7c4b-44c2-be59-8a74c376af7a" class=""><strong>📖 개요</strong></p><p id="83677b3f-c3b0-4f59-a922-aa56543ba5a0" class="">👏 SSAFY 11기 2학기 자율 프로젝트 👏</p><p id="34e83f9e-bec2-4483-a6dd-4d7726695c63" class=""><strong>2024.10.14 ~ 2024.11.19 (6주)</strong></p><p id="76752768-7389-4c70-826f-838fdc332ea9" class=""><strong>(깃허브 메인 이동 버튼 추가)</strong></p><p id="9f97cc34-c8dc-4e99-add0-722f07f6554d" class=""><strong>💡 프로젝트 기획</strong></p><p id="8ab0ffa0-8d27-42f2-85d6-9bea7c7bc142" class=""><strong>배경</strong></p><hr id="cc24a9cc-e178-443e-a719-b4d29fcafb69"/><p id="155155d9-02cc-403e-b7f0-d7af98a08333" class="">(깃허브 메인 이동 버튼 추가)</p><p id="797516e1-e9a8-4088-b7a9-d42387d72d6b" class="">🌵 빌드 환경</p><table id="71b9bff6-717e-4de6-82d2-1f9d22eadc4c" class="simple-table"><thead class="simple-table-header"><tr id="afbb077e-d5b8-4d88-8354-c596fb2b9de9"><th id="Kd:v" class="simple-table-header-color simple-table-header"><strong>FrontEnd</strong></th><th id="\?yE" class="simple-table-header-color simple-table-header" style="width:201.21250915527344px"><strong>BackEnd</strong></th><th id="Ud}\" class="simple-table-header-color simple-table-header"><strong>Database</strong></th><th id="~a[P" class="simple-table-header-color simple-table-header"><strong>Infra</strong></th><th id="uuQG" class="simple-table-header-color simple-table-header"><strong>AI</strong></th></tr></thead><tbody><tr id="7fcda891-0880-45ef-b5ba-119bf0c8ed77"><td id="Kd:v" class="">Next.js 14.2.6</td><td id="\?yE" class="" style="width:201.21250915527344px">Java 21 (Amazon Corretto 21)</td><td id="Ud}\" class="">MySQL 8.0.37</td><td id="~a[P" class="">AWS EC2 (Ubuntu 20.04 LTS)</td><td id="uuQG" class="">OOTDiffusion</td></tr><tr id="a478ae47-ed72-44f0-89b7-a85893ea2dc6"><td id="Kd:v" class="">Node.js 20</td><td id="\?yE" class="" style="width:201.21250915527344px">Spring Boot 3.3.5</td><td id="Ud}\" class="">Redis 7.2.1</td><td id="~a[P" class="">Nginx 1.26.2</td><td id="uuQG" class="">YoLo v8 - Deepfashion</td></tr><tr id="3701eeee-148d-42ae-af88-62cf22dac442"><td id="Kd:v" class="">TypeScript 5.6.3</td><td id="\?yE" class="" style="width:201.21250915527344px">Gradle 8.10.2</td><td id="Ud}\" class=""></td><td id="~a[P" class="">Jenkins 2.462.3</td><td id="uuQG" class=""></td></tr><tr id="da4b13f9-d2d9-40c7-ada7-c11fb64d6c8b"><td id="Kd:v" class="">React 18.3.1</td><td id="\?yE" class="" style="width:201.21250915527344px">Spring Data JPA</td><td id="Ud}\" class=""></td><td id="~a[P" class="">Docker 27.3.1</td><td id="uuQG" class=""></td></tr><tr id="089568b3-5bf1-4a7e-8895-2e0b18101284"><td id="Kd:v" class="">Zustand 5.0.1</td><td id="\?yE" class="" style="width:201.21250915527344px">IntelliJ IDEA 2024.1.4<br/> (Ultimate Edition)<br/></td><td id="Ud}\" class=""></td><td id="~a[P" class="">Docker Compose 2.29.2</td><td id="uuQG" class=""></td></tr><tr id="03b50019-5b8a-4239-a5e5-1f1aebdf554e"><td id="Kd:v" class="">Tailwind CSS</td><td id="\?yE" class="" style="width:201.21250915527344px">lombok</td><td id="Ud}\" class=""></td><td id="~a[P" class="">AWS S3</td><td id="uuQG" class=""></td></tr><tr id="627dd93c-a44c-4c41-8bb5-8505d649d32f"><td id="Kd:v" class=""></td><td id="\?yE" class="" style="width:201.21250915527344px">JWT</td><td id="Ud}\" class=""></td><td id="~a[P" class=""></td><td id="uuQG" class=""></td></tr><tr id="0876a6de-326a-439e-966f-a0089540ebc9"><td id="Kd:v" class=""></td><td id="\?yE" class="" style="width:201.21250915527344px">Python 3.9</td><td id="Ud}\" class=""></td><td id="~a[P" class=""></td><td id="uuQG" class=""></td></tr><tr id="8ea76070-de74-43ff-a431-f99973f26405"><td id="Kd:v" class=""></td><td id="\?yE" class="" style="width:201.21250915527344px">fastAPI 0.115.4</td><td id="Ud}\" class=""></td><td id="~a[P" class=""></td><td id="uuQG" class=""></td></tr><tr id="4da3bbd2-861a-48d7-aa8a-aa79e270ca8a"><td id="Kd:v" class=""></td><td id="\?yE" class="" style="width:201.21250915527344px">selenium</td><td id="Ud}\" class=""></td><td id="~a[P" class=""></td><td id="uuQG" class=""></td></tr></tbody></table><p id="7c9bd324-15c5-4e76-bc21-65b42ad68ee4" class="">(깃허브 메인 이동 버튼 추가)</p><p id="7ec7dfb8-e04a-47fc-9fe7-99b17d9c846f" class="">구현</p><p id="e5edf581-0d98-4d2d-b0a2-d884b66f8633" class="">🎯 주요 페이지 및 기능</p><p id="e0123059-cd5b-480a-b5cc-132e7bad597e" class="">메인화면</p><figure id="f64c436b-151a-4286-8f87-200210c94265" class="image"><a href="%25EB%25A9%2594%25EC%259D%25B8%25ED%2599%2594%25EB%25A9%25B4.png"><img style="width:355.0000305175781px" src="%25EB%25A9%2594%25EC%259D%25B8%25ED%2599%2594%25EB%25A9%25B4.png"/></a></figure><p id="517c57d0-e3c7-4dea-8e11-0b74befcb117" class="">개인의류 등록</p><div id="6d085943-a9d8-4dea-9de6-ee0647718014" class="column-list"><div id="374f5ebf-a98a-4a3a-9a1a-788cfb2ff58c" style="width:50%" class="column"><figure id="7d7edb0f-cb29-4441-bd39-f6ceadb4a1eb" class="image"><a href="%25EA%25B0%259C%25EC%259D%25B8%25EC%259D%2598%25EB%25A5%2598%25EB%2593%25B1%25EB%25A1%259D.png"><img style="width:355.0000305175781px" src="%25EA%25B0%259C%25EC%259D%25B8%25EC%259D%2598%25EB%25A5%2598%25EB%2593%25B1%25EB%25A1%259D.png"/></a></figure></div><div id="211c9d93-5730-435b-a856-7e1e415e70c0" style="width:50%" class="column"><figure id="f54faec0-84e5-4ed3-b88f-318b29902bd7" class="image"><a href="%25EC%2583%2581%25ED%2592%2588%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"><img style="width:330.9921875px" src="%25EC%2583%2581%25ED%2592%2588%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"/></a></figure></div></div><p id="3480cd48-4eb5-4d7e-b692-17c19ab90fe0" class="">상품 상세보기</p><figure id="b564347e-707a-4b90-b16e-1755ae833e4c" class="image"><a href="%25EC%2583%2581%25ED%2592%2588_%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"><img style="width:355.0000305175781px" src="%25EC%2583%2581%25ED%2592%2588_%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"/></a></figure><p id="c72389ad-0498-4662-9ccd-45ab6a174f40" class="">색상 필터링 및 색상 기반 추천</p><div id="92817259-6c60-4bf0-b076-78415a9c5233" class="column-list"><div id="21ed5199-3ab5-4047-a2d1-bfd3fd7422bf" style="width:50%" class="column"><figure id="2e4927c9-6ac5-42f9-bd14-b06ff34e8900" class="image"><a href="%25EC%2583%2589%25EC%2583%2581_%25ED%2595%2584%25ED%2584%25B0%25EB%25A7%2581.png"><img style="width:355.0000305175781px" src="%25EC%2583%2589%25EC%2583%2581_%25ED%2595%2584%25ED%2584%25B0%25EB%25A7%2581.png"/></a></figure></div><div id="2c7402b7-dec8-4f36-a5bc-c94f40206b7f" style="width:50%" class="column"><figure id="96053a05-5a82-445f-b713-19321341e125" class="image"><a href="%25EC%2583%2589%25EC%2583%2581%25ED%2595%2584%25ED%2584%25B0%25EB%25A7%2581_%25EC%25B6%2594%25EC%25B2%259C.png"><img style="width:355.0000305175781px" src="%25EC%2583%2589%25EC%2583%2581%25ED%2595%2584%25ED%2584%25B0%25EB%25A7%2581_%25EC%25B6%2594%25EC%25B2%259C.png"/></a></figure></div></div><p id="285dff5b-05a3-4bb0-9f89-383e64840174" class="">
</p><p id="280c4efd-9692-4a9c-ae3d-7ca0dc60fe58" class="">옷장 개인 의류 추가</p><div id="676f8efc-5fd6-4d27-b1e7-15fa3f9bbf3f" class="column-list"><div id="d4a66b6f-3b13-4524-a935-248aad711d72" style="width:33.33333333333334%" class="column"><figure id="590f0729-0ff5-47a2-bdff-c8a0be75b564" class="image"><a href="%25EC%2598%25B7%25EC%259E%25A5_%25EC%2583%2581%25EC%259D%2598%25EB%25A7%258C.png"><img style="width:330.9750061035156px" src="%25EC%2598%25B7%25EC%259E%25A5_%25EC%2583%2581%25EC%259D%2598%25EB%25A7%258C.png"/></a></figure></div><div id="a785e633-109d-4657-bc90-5a4d76f8005f" style="width:33.33333333333333%" class="column"><figure id="a55281b4-5bfc-4989-8cb9-c432465a3551" class="image"><a href="%25EC%2598%25B7%25EC%259E%25A5_%25EA%25B0%259C%25EC%259D%25B8%25EC%259D%2598%25EB%25A5%2598%25EC%25B6%2594%25EA%25B0%2580%25EC%25A0%2584.png"><img style="width:355.0000305175781px" src="%25EC%2598%25B7%25EC%259E%25A5_%25EA%25B0%259C%25EC%259D%25B8%25EC%259D%2598%25EB%25A5%2598%25EC%25B6%2594%25EA%25B0%2580%25EC%25A0%2584.png"/></a></figure></div><div id="58d61969-6459-43d6-9326-b87e82c04124" style="width:33.33333333333334%" class="column"><figure id="4c1c84b8-7ac3-43c2-891b-6c949126463c" class="image"><a href="%25EC%2598%25B7%25EC%259E%25A5_%25EC%2583%2581%25EC%259D%2598%25EB%25A7%258C%201.png"><img style="width:355.0000305175781px" src="%25EC%2598%25B7%25EC%259E%25A5_%25EC%2583%2581%25EC%259D%2598%25EB%25A7%258C%201.png"/></a></figure></div></div><p id="d876062f-e152-44c4-9fd3-08a7d5e3f3b6" class="">
</p><p id="44f4d72a-d4c3-4ece-bf5b-5d6b6e135792" class="">좋아요한 피팅</p><figure id="540b89d0-6164-47f2-95c3-192b4b5959ae" class="image"><a href="%25EC%25A2%258B%25EC%2595%2584%25EC%259A%2594%25ED%2595%259C%25ED%2594%25BC%25ED%258C%2585.png"><img style="width:355.0000305175781px" src="%25EC%25A2%258B%25EC%2595%2584%25EC%259A%2594%25ED%2595%259C%25ED%2594%25BC%25ED%258C%2585.png"/></a></figure><p id="5be63e87-4514-41a6-86fa-8e061203e987" class="">피드</p><figure id="c6ef4027-ed7a-42e3-aff0-2c192e9ae3ce" class="image"><a href="%25ED%2594%25BC%25EB%2593%259C.png"><img style="width:355.0000305175781px" src="%25ED%2594%25BC%25EB%2593%259C.png"/></a></figure><p id="770a3943-5f2e-4791-8748-5654f208d7b6" class="">피팅</p><div id="dad118e5-c8e4-44bc-86c0-aa10e4790537" class="column-list"><div id="dffc09a0-f4e3-4cbf-9393-c34299e0c720" style="width:33.333333333333336%" class="column"><figure id="f396b168-58eb-4069-9da9-c3aefd4123ca" class="image"><a href="%25ED%2594%25BC%25ED%258C%2585_%25ED%2595%25A9%25EC%2584%25B1.png"><img style="width:355.0000305175781px" src="%25ED%2594%25BC%25ED%258C%2585_%25ED%2595%25A9%25EC%2584%25B1.png"/></a></figure></div><div id="1785b523-b27b-4770-b281-34c29701783c" style="width:33.333333333333336%" class="column"><figure id="61dd3e61-c51f-4a84-a451-801f214d9770" class="image"><a href="%25ED%2594%25BC%25ED%258C%2585%25EA%25B2%25B0%25EA%25B3%25BC%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"><img style="width:355.0000305175781px" src="%25ED%2594%25BC%25ED%258C%2585%25EA%25B2%25B0%25EA%25B3%25BC%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png"/></a></figure></div><div id="0d405bf1-f510-4be3-aea1-ac24a4728ba2" style="width:33.33333333333333%" class="column"><figure id="c435ed67-e1b9-41ef-a11f-9904e65184d4" class="image"><a href="%25ED%2594%25BC%25ED%258C%2585%25EA%25B2%25B0%25EA%25B3%25BC%25ED%2599%2594%25EB%25A9%25B4.png"><img style="width:355.0000305175781px" src="%25ED%2594%25BC%25ED%258C%2585%25EA%25B2%25B0%25EA%25B3%25BC%25ED%2599%2594%25EB%25A9%25B4.png"/></a></figure></div></div><p id="dd131f94-e49a-4483-a7c1-58ba3134716e" class="">
</p><p id="44500692-bd4b-4496-8388-59a528c88c96" class="">
</p><p id="1b43251d-7a9f-4d56-b859-ebc3febff60c" class="">
</p><p id="075aae2d-6f9b-4ce6-808b-144708519d9b" class="">
</p><p id="8fdc137a-ca10-49da-980b-12a57dff9e9a" class="">
</p><p id="c273a2da-4d9f-41ee-a45d-a86af2ca6952" class="">
</p><p id="91456f20-eab3-43aa-a73a-7232e33adcc2" class="">(깃허브 메인 이동 버튼 추가)</p><p id="c13d22ad-87ee-40c2-a293-7fe763f04e2d" class="">(상세 기능 추가)</p><p id="d59f56be-a97c-468e-9633-dcf16437de2f" class="">(깃허브 메인 이동 버튼 추가)</p><p id="d9f0fa0b-b63d-4f5d-a278-8253b90cffcd" class="">👀 산출물</p><p id="7d0b2b15-c2c3-4464-9a2a-debd4def96f3" class="">요구사항명세서</p><hr id="ec818907-0360-47e1-90e3-1ea1d341b599"/><hr id="097d485f-60fd-4140-959a-ff9f91c8d395"/><table id="65e59993-c59e-4dd2-a592-99bc24a824f6" class="simple-table"><tbody><tr id="3a1a340e-6bab-457c-b146-64e1b2fb4402"><td id="xvZx" class="">API 명세서</td><td id="D[^H" class="">API 명세서(세부)</td></tr><tr id="f2c1acbd-c27d-4ef1-8403-cbcac88f28ae"><td id="xvZx" class=""></td><td id="D[^H" class=""></td></tr></tbody></table><div id="ce4d2105-a401-4bae-b72f-86176a152cc2" class="column-list"><div id="a0167ffe-69de-4d0f-9d40-ae259082b743" style="width:50%" class="column"><figure id="a1135589-15ce-4ce6-a520-4850facae19d" class="image"><a href="image.png"><img style="width:330.9875183105469px" src="image.png"/></a></figure></div><div id="033fd40f-4b31-43b0-9df1-8f1d0ac932e9" style="width:50%" class="column"><figure id="bea57ec8-0ea1-461e-b4eb-82c57b25b149" class="image"><a href="image%201.png"><img style="width:330.9875183105469px" src="image%201.png"/></a></figure></div></div><p id="98033285-4f6e-4b69-915a-d3e4c0a81428" class="">ERD</p><figure id="c6b1b9a7-4181-4a8b-a50b-d158c8a9b5eb" class="image"><a href="5971cfa6-9e85-4bf2-92ff-b77b3b24744b.png"><img style="width:608.4942084942085px" src="5971cfa6-9e85-4bf2-92ff-b77b3b24744b.png"/></a></figure><hr id="6cfc679b-e1ce-4b65-a114-679d4cb8abd6"/><hr id="d626e3ca-cba4-4cc6-9654-b56349cc7a4b"/><p id="899611fb-e1be-4da0-9a9a-5c72a77db19b" class="">시스템 구조도</p><figure id="9e1c6fe1-370d-4220-b9aa-99c2dd49862f" class="image"><a href="image%202.png"><img style="width:691px" src="image%202.png"/></a></figure><p id="df3c8250-2389-4e95-986b-77cad7eea52f" class="">
</p><p id="38c0af92-6fcb-4c55-97d3-54812584f63b" class="">지라 번다운 차트</p><table id="e9e6be94-89f0-40b0-85ca-7e42c8fcfa01" class="simple-table"><tbody><tr id="a07cb84c-a5f2-48f5-bbbe-cfa86306be7c"><td id="Bg|g" class="">1주차 스프린트</td><td id="_XaE" class="">2주차 스프린트</td><td id="]h^d" class="">3주차 스프린트</td></tr><tr id="6cdab680-c8cf-444c-a7f2-a76327b608c9"><td id="Bg|g" class=""></td><td id="_XaE" class=""></td><td id="]h^d" class=""></td></tr></tbody></table><figure id="43e2e44c-7f49-415d-ad07-010eb22e38a0" class="image"><a href="image%203.png"><img style="width:2553px" src="image%203.png"/></a></figure><figure id="056b51b0-5237-444a-8b82-7e7bd0cd0531" class="image"><a href="image%204.png"><img style="width:2556px" src="image%204.png"/></a></figure><figure id="089f2ae4-78c6-4d2e-af2e-9a05e2670356" class="image"><a href="image%205.png"><img style="width:2557px" src="image%205.png"/></a></figure><table id="37fa1cc4-d410-437b-9af6-17f26ac965fc" class="simple-table"><tbody><tr id="13558c5e-bee5-4e65-ae16-4f3980f201d4"><td id="^SDv" class="">4주차 스프린트</td><td id="c\}b" class="">5주차 스프린트</td><td id="OCYO" class="">6주차 스프린트</td></tr><tr id="2c2edddf-d65f-4b97-abfb-4e0c94ce874a"><td id="^SDv" class=""></td><td id="c\}b" class=""></td><td id="OCYO" class=""></td></tr></tbody></table><figure id="d255dfcb-39d9-4a16-9733-afece081dc0a" class="image"><a href="image%206.png"><img style="width:707.9791870117188px" src="image%206.png"/></a></figure><figure id="5d53e00b-8e8d-42c3-ac2a-6a6a53b040b8" class="image"><a href="image%207.png"><img style="width:2561px" src="image%207.png"/></a></figure><p id="3095f912-e9da-4d3a-9041-4c595d3bebd3" class="">최종발표 PPT</p><p id="fd9cf33b-ca60-4cdd-ab6f-1a896f51490a" class="">
</p><p id="7d2f0ffe-dd08-4762-86b5-d66ff0e2f5bb" class="">
</p><p id="f216f1b9-c970-4cca-a3e3-fe51dec67fa6" class="">(깃허브 메인 이동 버튼 추가)</p><p id="01445481-3c23-457e-9e55-60a9311b1cd7" class="">📚 파일 구조도</p><p id="41ce48a4-9171-4feb-90d1-199d0bfcd5f6" class="">FrontEnd</p><p id="fa48f191-19bc-494b-a1e6-8b3bfa10416f" class="">📦frontend</p><p id="57f6f3ec-4baa-41fa-ba09-44f96b585917" class="">┣ 📂.next</p><p id="7c4fce42-eaa8-455e-aeee-c7adaa3ddda9" class="">┣ 📂.storybook</p><p id="a0e3322f-d500-4885-a879-6e0e39a07501" class="">┣ 📂public</p><p id="877d95a9-4172-42f6-9f7e-8a742e4557e2" class="">┃ ┣ 📂assets</p><p id="c4087426-e60b-481b-9d0c-dad670bc6abb" class="">┃ ┃ ┣ 📂form</p><p id="87d3adee-2c02-4f2b-bad2-2ef8ee625940" class="">┃ ┃ ┣ 📂login</p><p id="10d10c2e-1ff0-429c-b6ab-612c1e366a81" class="">┣ 📂src</p><p id="64494f7d-1d59-4644-82c3-63b3a1436ca3" class="">┃ ┣ 📂app</p><p id="f5b39b33-9055-4bbe-a7cf-c21393db1810" class="">┃ ┃ ┣ 📂(main)</p><p id="1fed159c-a019-43b6-b264-e1b73c93c123" class="">┃ ┃ ┣ 📂auth</p><p id="0cb9fc9d-5a80-4840-8f6d-9129950e9202" class="">┃ ┃ ┃ ┣ 📂login</p><p id="260304ac-5513-469a-b594-f809cc66d8b5" class="">┃ ┃ ┃ ┃ ┣ 📂_components</p><p id="57a8876c-0734-4293-9f56-11813cf2e3d4" class="">┃ ┃ ┃ ┃ ┃ ┣ 📂KakaoLoginButton</p><p id="14003d56-0ef5-4521-9d6e-706baddd6315" class="">┃ ┃ ┃ ┃ ┃ ┗ 📂NaverLoginButton</p><p id="03caf621-9748-4827-a0dd-73b80ce642bc" class="">┃ ┃ ┃ ┣ 📂nickname</p><p id="a772a334-869a-46ec-a60a-8b32b34c9430" class="">┃ ┃ ┃ ┗ 📂redirect</p><p id="d2f253b7-556c-4254-a267-7a1df9b1f793" class="">┃ ┃ ┣ 📂create</p><p id="a6708cce-f311-4901-a53e-4354c55e6f1b" class="">┃ ┃ ┣ 📂fonts</p><p id="876759bb-ad25-46d9-9d0e-d3e001e4d288" class="">┃ ┃ ┣ 📂test</p><p id="83eeefa1-9d41-4c3b-9f23-e199b751e4a4" class="">┃ ┣ 📂components</p><p id="46db7ddf-ae0f-4a71-8126-e79a2b096caf" class="">┃ ┃ ┣ 📂Button</p><p id="7b8bd222-872b-484f-940c-8159c466668a" class="">┃ ┃ ┃ ┣ 📂CreateButton</p><p id="3758b841-192d-452f-b3f9-bbdebe12975e" class="">┃ ┃ ┃ ┣ 📂DeleteButton</p><p id="ff3d8390-7c64-4d1a-ada7-c15610138cc1" class="">┃ ┃ ┃ ┣ 📂IndexButton</p><p id="a5d46769-e37d-44c5-8d5e-bdedfa8947ed" class="">┃ ┃ ┃ ┣ 📂LikeButton</p><p id="4aeff7a8-e878-4fc9-9e28-f32b22ca7e66" class="">┃ ┃ ┃ ┣ 📂LogoutButton</p><p id="01e8f586-d127-4183-b80c-b82a3a730f3f" class="">┃ ┃ ┃ ┣ 📂PaginationButton</p><p id="56420373-20bb-4aca-8313-c07ab21ccde0" class="">┃ ┃ ┃ ┣ 📂ReportButton</p><p id="ea4a9760-ffcc-4897-b275-8afe9c0ff268" class="">┃ ┃ ┃ ┣ 📂RouteButton</p><p id="e5c41dcc-69eb-47e7-8c45-95d242b4e8bc" class="">┃ ┃ ┃ ┣ 📂ShareButton</p><p id="b4caa64f-7ace-4396-b9bd-421e6e7f25b7" class="">┃ ┃ ┃ ┣ 📂VoteButton</p><p id="ae4d7912-14de-43ae-90ca-17ca56ec81bc" class="">┃ ┃ ┃ ┣ 📂WordVoteButton</p><p id="19afe840-4263-4c48-99e7-aac26ece6b3f" class="">┃ ┃ ┣ 📂Card</p><p id="b1b0c331-e942-482a-a8e6-959751371f3f" class="">┃ ┃ ┣ 📂Form</p><p id="537d064c-8775-46d3-9c6e-3fe7b6a8278e" class="">┃ ┃ ┣ 📂Header</p><p id="aece76cc-6315-4b21-ba76-b6644026054b" class="">┃ ┃ ┣ 📂Input</p><p id="960ba909-74b1-49e7-b5f4-da709e9c9e0c" class="">┃ ┃ ┃ ┣ 📂SearchInput</p><p id="2261f63e-130f-4daf-8dbc-b13f1bcbe786" class="">┃ ┃ ┃ ┗ 📂ValueInput</p><p id="23e26b26-309c-47d3-9d12-298e23d7805b" class="">┃ ┃ ┣ 📂Modal</p><p id="d4d68480-da01-4521-b8d9-a6a95609d851" class="">┃ ┃ ┣ 📂Skeleton</p><p id="9d1bc6cc-e8b6-4b3d-a2c2-c7c6f744ffc3" class="">┃ ┃ ┗ 📂Textarea</p><p id="86ab3516-8e62-47c6-a582-aaa5edd232f0" class="">┃ ┣ 📂context</p><p id="6f4247d9-4888-4656-ab32-4c47ea1fdf83" class="">┃ ┣ 📂store</p><p id="092c76c4-2020-403a-9351-d0ce741b715b" class="">┃ ┣ 📂stories</p><p id="9e91e811-aa2e-4a43-ae55-359641400c45" class="">┃ ┃ ┗ 📂assets</p><p id="16cd2d1e-9f0e-4d94-8a15-33f7e804d650" class="">┃ ┣ 📂utils</p><p id="6bb7d974-d612-4426-ba19-1418eca1441a" class="">┃ ┃ ┣ 📂loader</p><p id="a49243b0-5c59-4c04-8e7f-7d99c721ffe4" class="">┃ ┗ 📂vendor</p><p id="e1954bca-e266-4957-a052-0579a201aa58" class="">┗ 📜yarn.lock</p><p id="317446cb-71d7-4d0e-9c4c-6f91647a60af" class="">BackEnd</p><p id="f515c07a-7bee-483e-896e-6c0b77ec3875" class="">📦backend/memetionary</p><p id="a76e8fa3-3ead-4801-9257-03b92ea1ad39" class="">┣ 📂gradle</p><p id="93ffb920-1a7e-44e9-a4d1-eb922b64f249" class="">┃ ┗ 📂wrapper</p><p id="abe8e924-7ee3-4fd2-8c29-a96fd35143fa" class="">┃ ┃ ┣ 📜gradle-wrapper.jar</p><p id="7b9a1a81-6b53-4246-a746-ceb2c6456bbd" class="">┃ ┃ ┗ 📜gradle-wrapper.properties</p><p id="154aabad-f324-416d-b270-57317309255b" class="">┣ 📂src</p><p id="5425e066-4edb-4fff-8e24-1576a33498f3" class="">┃ ┣ 📂main</p><p id="7edfcb75-4d62-4496-9f01-1b1b02ccc183" class="">┃ ┃ ┣ 📂java</p><p id="00e74b39-25de-4edc-9329-127e5ba6a7dc" class="">┃ ┃ ┃ ┗ 📂com</p><p id="6ad56b88-a787-49f2-a943-1c05ccacd751" class="">┃ ┃ ┃ ┃ ┗ 📂ssafy</p><p id="4aeddfc8-ef17-4442-a743-b581e2b2df8f" class="">┃ ┃ ┃ ┃ ┃ ┗ 📂memetionary</p><p id="19dfd990-a185-4339-a6a8-b2556df7ccec" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common</p><p id="a731f311-fcdf-464c-a07c-f66932c13ac5" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller</p><p id="c9fccbff-40d2-4f27-9e16-eb3f63d40782" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="33dab4b6-bb77-472a-b0c3-600551e120b6" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="590c9b34-f6ea-4680-b1a3-5812b93d3c74" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception</p><p id="b545326f-d289-4c04-a887-a2c4d02946eb" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config</p><p id="ca6529e0-7f2c-458e-b4a7-fc5077dd2df1" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂declaration</p><p id="30417ab2-6101-4e3a-9335-8c09bd148276" class=""> ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller</p><p id="2f825949-972c-406f-9c5a-197eacc29226" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="98a61d35-44a5-4d50-ab71-16b60909375a" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="489fd50a-496a-400e-ab3a-abe504550d37" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="968b3ae8-3c6d-4a8e-a862-40653cb6e31b" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="3eb47e5d-4492-4699-8a98-e41ce3e072c4" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂hashtag</p><p id="d5707881-db89-41f6-88fe-0ad28b021a3f" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="fa326830-0186-4baf-ac80-b6790d082fde" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="4b715ed7-6932-485e-a3b8-8c4d0ddffcb8" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="86f56394-4453-40f1-94df-a545430b781a" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂link</p><p id="21989cc6-a4b2-444a-8408-72171a7ff67f" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="7f0da80d-4694-4f05-a19a-2ba313692d06" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="9c2a3dac-6fa5-44ef-b660-4ebfc4fea082" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="58cd276a-c25c-4bbe-8a8d-c378f3c4b8be" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂member</p><p id="d5118fa0-299d-4c25-96ac-20abfe50da63" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller</p><p id="36b9c773-b658-4a38-9353-0d4747af9a4f" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="b00383d7-6d4b-4adb-9802-e0e401300cc9" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="6de151a3-ac80-431e-896e-72e1346ddb64" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="8845e8f6-ec3c-4ca2-9d89-257bfb166d75" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="492290fe-1bd4-4110-bfdc-817953b8695b" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂oauth2</p><p id="f458383b-c754-4830-8169-31ce16fb47ae" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain</p><p id="9e01f030-9cd9-4129-87b6-a6332825580f" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="e036a07a-276f-43d5-81d2-d42c28f9b2ca" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂filter</p><p id="649896ab-f9f7-4efa-be63-37b2bf53fbc1" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂handler</p><p id="ff485aa4-e9fb-476c-bd6a-e1cb49e730c0" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="e2ba1596-1798-4969-904b-51a42e1c18a2" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service</p><p id="200bb8fa-acf6-44c5-b5b0-db4641cf90d1" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂token</p><p id="cb25391b-7d0a-4d4d-86aa-5d38dd648e11" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util</p><p id="b21258f1-8b19-4738-aab9-1c7e793e8e9e" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂word</p><p id="26fa7c53-ba7a-4454-980f-32b477368192" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller</p><p id="950aa910-442f-4bcf-be98-adeebecde760" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="363208c8-733d-47ba-9f7d-4f74078fafd0" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity</p><p id="826d88b2-0c96-44ae-8d60-ce29b1bd66ee" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="7d2292b6-3b3b-4c0d-9f33-63d8c3c58f06" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="642c2b59-3ac6-4244-922f-1dae0a173a4a" class="">┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂wordes</p><p id="18f1af69-e251-4380-abc8-b577fdda51db" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller</p><p id="64b737c2-11bd-48a1-8d69-19aa5ed60203" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂document</p><p id="3cbf7768-0ea9-4248-b53a-d117fd4afaa8" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto</p><p id="964be383-3d82-4c39-9916-f544765e1d01" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository</p><p id="927ca41a-586c-4728-b3af-ff2403132894" class="">┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service</p><p id="457996db-8bc7-4543-9a34-e703746d01d4" class="">┃ ┃ ┗ 📂resources</p><p id="016fcca1-953d-4bab-a840-b76275565734" class="">┃ ┃ ┃ ┣ 📂elasticsearch</p><p id="97cc9bc2-f086-4170-9fac-33607d818ed9" class="">┃ ┗ 📂test</p><p id="5ca7e366-bc92-455a-a604-62ea817870e8" class="">┃ ┃ ┗ 📂java</p><p id="469c6f17-874d-4c6d-a9f5-4cec8502b439" class="">┃ ┃ ┃ ┗ 📂com</p><p id="881ffe27-cc38-4039-9ea9-a499ba9b2c26" class="">┃ ┃ ┃ ┃ ┗ 📂ssafy</p><p id="de150fca-df7f-4cd5-ab3c-48374651f848" class="">┃ ┃ ┃ ┃ ┃ ┗ 📂memetionary</p><p id="e768ac20-a0f6-4c20-a05f-4c5a7899c7cd" class="">┣ 📜build.gradle</p><p id="41735031-41f2-410b-9f71-ddac042a140e" class="">┣ 📜Dockerfile</p><p id="fb3ccd18-f7ab-4ae8-9d20-bdb2761af768" class="">
</p><p id="16d7aa1a-610c-4341-bb09-b268b04e3ecb" class="">
</p><p id="8dd2ce48-1015-469e-b638-b05c249be160" class="">
</p><p id="01f92a71-4683-447c-b99a-66d299479935" class="">
</p><p id="5ba4476c-6d0b-4dd8-be85-8f0201a0cf4b" class="">
</p><p id="e6d03df0-1bcc-4bb5-ba88-712f527d8f6c" class="">(깃허브 메인 이동 버튼 추가)</p><p id="85843b8b-aa37-4448-a9f9-c3e357fc9d39" class="">마치며</p><p id="6fb9fd79-57dd-4772-b6be-0e016319b282" class="">👦 팀원</p><p id="2a6cbbff-3d1d-4fcf-857c-c347a9995436" class="">(웹 페이지 등록)</p><p id="08f0a21f-9a07-4577-9719-faa75c767891" class="">팀원 역할 상세</p><p id="cb8541b8-a9bf-46ff-9efa-773b14c3508d" class="">(깃허브 메인 이동 버튼 추가)</p><p id="97a47ac4-1513-41d8-aca0-81ca50601b27" class="">📣 소감</p><p id="c03e9841-6cec-483a-b28e-d24d2cdcc212" class="">😊 강현후</p><p id="1ae0c0f9-cba5-43e3-acd5-f9da0f54ff2f" class="">😎 손유진</p><p id="dfaf7291-7fb8-45e3-b702-0c53a1c1202a" class="">🍇 김성현</p><p id="2553f521-7364-4607-80f8-b35a427171e4" class="">🏡 임 권</p><p id="bbfdeb20-22f4-45e9-b827-da00a4d83305" class="">🥳 김연동</p><p id="df37cb11-f0f7-493e-b698-9cfad4e2effc" class="">👶 강지우</p><p id="44f23770-e9d1-4cd8-8d7c-657ff9e7078d" class="">🌱 회고</p><p id="303796b5-659c-43cd-8be2-bdd0760b9738" class="">
</p></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span></body></html>
