const TOPIC = {"id": "powerbi-kpi", "emoji": "📊", "category": "DATA ANALYTICS", "title": "Power BI — Complete KPI Analysis", "desc": "Go from a business question to a working KPI dashboard: understand the metric, prepare data, write DAX, visualise results and explain an insight.", "duration": 60, "sections": [{"title": "Understand KPIs and the business question", "mins": "10 min · Concept", "body": "<h3>What is a KPI?</h3><p>A Key Performance Indicator is a measurable value used to understand progress towards an important business objective. A metric is any measurement; a KPI is a metric that matters to a specific goal.</p><p>Example: a hospital may monitor daily revenue, OP visits, bed occupancy, average bill value and insurance claim settlement time. Each KPI should help someone decide what to do next.</p><h3>Choose the question before opening Power BI</h3><ul><li>What are we trying to improve?</li><li>Who will use this information?</li><li>How often must it be reviewed?</li><li>What action could change because of this number?</li></ul><div class='callout'><b>Real-life example</b><p>Management asks: “Are monthly hospital collections improving?” The KPI could be total collections by month, compared with the previous month and target.</p></div><h3>Define the KPI clearly</h3><p>Write its name, purpose, formula, unit, reporting frequency, owner and data source. Decide whether you measure billed revenue or actual collections—these are different concepts.</p>"}, {"title": "Prepare and understand your data", "mins": "12 min · Data preparation", "body": "<h3>Start with a clean table</h3><p>Power BI works best when each row represents one transaction and each column represents one attribute. For a simple billing table, use BillID, BillDate, Department, GrossAmount, Discount and NetAmount.</p><div class='code'>BillID | BillDate  | Department | NetAmount\n1001   | 01-Nov-26 | OP         | 1500\n1002   | 01-Nov-26 | Lab        | 2200\n1003   | 02-Nov-26 | Pharmacy   | 850</div><h3>Use Power Query</h3><ul><li>Set BillDate to Date data type.</li><li>Set amount fields to Decimal Number or Fixed Decimal.</li><li>Remove blank rows and investigate duplicates.</li><li>Standardise department names and trim extra spaces.</li><li>Check missing values and unusual negative amounts.</li></ul><h3>Build a simple model</h3><p>For a proper time analysis, create a Date table and relate Date[Date] to Billing[BillDate]. Keep descriptive dimensions such as Department in separate tables when the model grows.</p><div class='callout'><b>Quality rule</b><p>Never silently delete a suspicious transaction. Check the source and document the correction.</p></div>"}, {"title": "Create measures with DAX", "mins": "15 min · Hands-on DAX", "body": "<h3>What is a measure?</h3><p>A DAX measure calculates a result in the current filter context. It changes when a user filters the report by date, department or other fields.</p><div class='code'>Total Collections =\nSUM(Billing[NetAmount])</div><p>If your source has separate billed and collected amounts, create separate measures. Do not label billed amount as collections.</p><div class='code'>Total Bills =\nDISTINCTCOUNT(Billing[BillID])\n\nAverage Bill Value =\nDIVIDE([Total Collections], [Total Bills], 0)</div><h3>Previous month comparison</h3><p>With a continuous, marked Date table and an active relationship:</p><div class='code'>Previous Month Collections =\nCALCULATE(\n    [Total Collections],\n    DATEADD('Date'[Date], -1, MONTH)\n)</div><div class='code'>MoM Change % =\nDIVIDE(\n    [Total Collections] - [Previous Month Collections],\n    [Previous Month Collections]\n)</div><p>Format the percentage measure as Percentage. Validate the result against a known sample before publishing.</p><h3>Understand filter context</h3><p>If a user selects the Lab department, the same Total Collections measure calculates only Lab collections. That is why measures are reusable.</p>"}, {"title": "Build the dashboard and tell the story", "mins": "13 min · Visualisation", "body": "<h3>Build a useful one-page report</h3><ul><li>Card: Total Collections.</li><li>Card: Average Bill Value.</li><li>Card: Month-on-month change percentage.</li><li>Line chart: Collections by month.</li><li>Bar chart: Collections by department.</li><li>Slicer: Date and Department.</li></ul><h3>Design for decisions</h3><p>Use a clear title, consistent number formats and readable labels. Keep related visuals together. Avoid unnecessary 3D charts and too many colours. Add a note that defines what “collections” includes.</p><h3>Check interactions</h3><p>Select one department and confirm that all relevant visuals respond correctly. Test date filters, totals and blank periods. Ensure the report does not expose personal patient information to unauthorised viewers.</p><div class='callout'><b>Dashboard story example</b><p>“Collections increased by 8% compared with last month. Laboratory contributed the largest share. We should review the OP collection dip in the final week.” Only state this if your actual data supports it.</p></div>"}, {"title": "Validate, explain and publish responsibly", "mins": "10 min · Review", "body": "<h3>Validate before sharing</h3><ul><li>Compare the Power BI total with a trusted source report.</li><li>Check a few individual transactions manually.</li><li>Confirm date boundaries and department filters.</li><li>Check blank, duplicate and reversed transactions.</li><li>Ask a report user to test the page.</li></ul><h3>Explain the insight</h3><p>Use this simple structure: What happened? Compared with what? Why might it have happened? What should we investigate or do next?</p><h3>Publish with care</h3><p>Use the organisation's approved Power BI workspace and access permissions. Follow privacy and security rules, especially with hospital or patient-related information. Do not publish identifiable patient data in a public report.</p><div class='callout'><b>Today's mastery checklist</b><p>You should now be able to define a KPI, clean a small dataset, write a DAX measure, build a dashboard, validate totals and explain one evidence-based insight.</p></div>"}], "challenge": "Create a sample Billing table with at least 10 rows and three departments. Import it into Power BI, clean the date and amount columns, create Total Collections and Average Bill Value measures, then build a page with two cards, a monthly trend and a department bar chart. Validate the total against Excel.", "quiz": [{"q": "Which statement best describes a KPI?", "a": ["Any number shown on a report", "A measure linked to an important business objective", "A decorative chart"], "correct": 1, "why": "A KPI is a meaningful measure of progress towards an objective."}, {"q": "What is the recommended row structure for a transaction table?", "a": ["One row per transaction", "One row for all transactions in a month", "One row per chart"], "correct": 0, "why": "One row per transaction makes filtering and aggregation reliable."}, {"q": "Which DAX function is useful for safe division?", "a": ["SUM", "DIVIDE", "COUNT"], "correct": 1, "why": "DIVIDE handles division and lets you specify an alternate result for a zero denominator."}, {"q": "What should you do before sharing a dashboard?", "a": ["Assume totals are correct", "Validate totals, filters and access permissions", "Remove all labels"], "correct": 1, "why": "Validation and access control help prevent incorrect reporting and data exposure."}, {"q": "A billed amount has not yet been paid. Should it be called a collection?", "a": ["Yes", "No, billing and cash collection are different", "Only if it is in a card visual"], "correct": 1, "why": "Collections refer to amounts actually received, not merely billed."}]};
const $=s=>document.querySelector(s);
const todayKey=()=>new Date().toLocaleDateString('en-CA');
const storeKey='skillsprint-daily-'+todayKey();
let data=JSON.parse(localStorage.getItem(storeKey)||'{"done":[],"quiz":null,"notes":"","finished":false}');
let section=0, deferredInstall=null;
function save(){localStorage.setItem(storeKey,JSON.stringify(data));renderProgress();}
function toast(s){let t=$('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
function renderPlan(){
 const ml=currentLang()==='ml';
 $('#dateLabel').textContent=new Date().toLocaleDateString(ml?'ml-IN':'en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase();
 $('#topicTitle').textContent=ml?'പവർ ബി ഐ — സമ്പൂർണ്ണ കെ പി ഐ വിശകലനം':TOPIC.title;
 $('#topicDesc').textContent=ml?'കെ പി ഐ മനസ്സിലാക്കുക, ഡാറ്റ തയ്യാറാക്കുക, ഡാക്സ് മെഷറുകൾ സൃഷ്ടിക്കുക, അർത്ഥവത്തായ ഡാഷ്ബോർഡ് നിർമ്മിക്കുക.':TOPIC.desc;
 $('#topicEmoji').textContent=TOPIC.emoji;$('#topicCategory').textContent=ml?'ഡാറ്റാ അനലിറ്റിക്സ്':TOPIC.category;$('#duration').textContent=TOPIC.duration;
 const mins=ml?['10 മിനിറ്റ് · ആശയം','12 മിനിറ്റ് · ഡാറ്റ','15 മിനിറ്റ് · ഡാക്സ്','13 മിനിറ്റ് · ഡാഷ്ബോർഡ്','10 മിനിറ്റ് · പരിശോധന']:null;
 $('#stepList').innerHTML=TOPIC.sections.map((s,i)=>`<button class="step ${data.done.includes(i)?'done':''} ${section===i?'active':''}" data-section="${i}"><span class="step-number">${data.done.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><span class="step-copy"><b>${ml?MALAYALAM_TITLES[i]:s.title}</b><small>${ml?mins[i]:s.mins}</small></span><span class="step-status">${data.done.includes(i)?'✓':'›'}</span></button>`).join('');
 document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>showSection(+b.dataset.section));
}
function currentLang(){return $('#languageSelect')?.value||'en';}
function showSection(i){section=Math.max(0,Math.min(i,TOPIC.sections.length-1));let s=TOPIC.sections[section];const ml=currentLang()==='ml';$('#sectionCounter').textContent=ml?`വിഭാഗം ${section+1} / ${TOPIC.sections.length}`:`SECTION ${section+1} OF ${TOPIC.sections.length}`;$('#sectionTitle').textContent=ml?MALAYALAM_TITLES[section]:s.title;$('#sectionIcon').textContent=String(section+1).padStart(2,'0');$('#lessonBody').innerHTML=ml?MALAYALAM_LESSONS[section]:s.body;$('#prevBtn').textContent=ml?'← മുമ്പത്തേത്':'← Previous';$('#nextBtn').textContent=ml?'അടുത്തത് →':'Next →';$('#doneBtn').textContent=data.done.includes(section)?(ml?'വിഭാഗം പൂർത്തിയായി ✓':'Section completed ✓'):(ml?'വിഭാഗം പൂർത്തിയാക്കുക ✓':'Complete section ✓');$('#doneBtn').classList.toggle('secondary',data.done.includes(section));renderPlan();speechSynthesis?.cancel();$('#audioBtn').textContent=ml?'▶ കേൾക്കുക':'▶ Listen';}
function renderProgress(){let n=data.done.length,total=TOPIC.sections.length,p=Math.round(n/total*100);$('#progressBar').style.width=p+'%';$('#progressText').textContent=`${n} of ${total} sections completed`;$('#progressPercent').textContent=p+'%';$('#streak').textContent='🔥 '+getStreak()+' day streak';}
function getStreak(){let n=0,d=new Date();for(let i=0;i<365;i++){let k=d.toLocaleDateString('en-CA');let v=localStorage.getItem('skillsprint-daily-'+k);if(!v)break;let x=JSON.parse(v);if(!x.finished)break;n++;d.setDate(d.getDate()-1);}return n;}
function getQuizBank(){return currentLang()==='ml'?MALAYALAM_QUIZ:TOPIC.quiz;}
function renderQuiz(){const bank=getQuizBank();$('#quiz').innerHTML=bank.map((q,i)=>`<div class="quiz-item" data-q="${i}"><div class="quiz-question">${i+1}. ${q.q}</div>${q.a.map((a,j)=>`<button class="answer" data-qi="${i}" data-ai="${j}">${String.fromCharCode(65+j)}. ${a}</button>`).join('')}</div>`).join('');document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answer(+b.dataset.qi,+b.dataset.ai));if(data.quiz!==null)showQuizResult();}
let answers={};
function answer(qi,ai){answers[qi]=ai;let bank=getQuizBank(),q=bank[qi],all=[...document.querySelectorAll(`[data-qi="${qi}"]`)];all.forEach(b=>{b.disabled=true;let a=+b.dataset.ai;if(a===q.correct)b.classList.add('correct');else if(a===ai)b.classList.add('wrong')});let feedback=document.createElement('div');feedback.className='quiz-result';feedback.textContent=(ai===q.correct?(currentLang()==='ml'?'ശരി. ':'Correct. '):(currentLang()==='ml'?'ഒന്ന് കൂടി പഠിക്കാം. ':'Review this one. '))+q.why;$('#quiz').querySelector(`[data-q="${qi}"]`).append(feedback);if(Object.keys(answers).length===bank.length){data.quiz=Math.round(bank.filter((x,i)=>answers[i]===x.correct).length/bank.length*100);save();showQuizResult();}}
function showQuizResult(){if(data.quiz===null)return;$('#quizResult').textContent=currentLang()==='ml'?`നിങ്ങളുടെ സ്കോർ: ${data.quiz}%. ${data.quiz>=80?'മികച്ചത്! നിങ്ങൾ പരീക്ഷ വിജയിച്ചു.':'പാഠഭാഗങ്ങൾ വീണ്ടും പഠിച്ച് പരീക്ഷ ആവർത്തിക്കുക.'}`:`Your score: ${data.quiz}%. ${data.quiz>=80?'Excellent work! You passed the knowledge check.':'Review the sections and try again after resetting today.'}`;}
const MALAYALAM_TITLES = [
'കെ പി ഐയും ബിസിനസ് ലക്ഷ്യവും മനസ്സിലാക്കുക',
'ഡാറ്റ തയ്യാറാക്കുകയും പരിശോധിക്കുകയും ചെയ്യുക',
'ഡാക്സ് ഉപയോഗിച്ച് മെഷറുകൾ സൃഷ്ടിക്കുക',
'ഡാഷ്ബോർഡ് നിർമ്മിച്ച് വിവരങ്ങൾ അവതരിപ്പിക്കുക',
'പരിശോധിച്ച് ഉത്തരവാദിത്തത്തോടെ പ്രസിദ്ധീകരിക്കുക'
];
const MALAYALAM_LESSONS = [
`<h3>കെ പി ഐ എന്താണ്?</h3><p>ഒരു പ്രധാന ബിസിനസ് ലക്ഷ്യത്തിലേക്കുള്ള പുരോഗതി അളക്കാൻ സഹായിക്കുന്ന സൂചകമാണ് കെ പി ഐ (Key Performance Indicator). എല്ലാ കണക്കുകളും കെ പി ഐ അല്ല. ഒരു പ്രധാന ലക്ഷ്യവുമായി നേരിട്ട് ബന്ധപ്പെട്ട അളവാണ് കെ പി ഐ.</p><p>ഉദാഹരണത്തിന്, ഒരു ആശുപത്രി ദിവസവരുമാനം, ഒ പി സന്ദർശനങ്ങൾ, ബെഡ് ഒക്ക്യുപൻസി, ശരാശരി ബിൽ തുക, ഇൻഷുറൻസ് ക്ലെയിം തീർപ്പാക്കുന്ന സമയം എന്നിവ നിരീക്ഷിക്കാം. അടുത്തതായി എന്ത് നടപടി എടുക്കണമെന്ന് തീരുമാനിക്കാൻ ഓരോ കെ പി ഐയും സഹായിക്കണം.</p><h3>പവർ ബി ഐ തുറക്കുന്നതിന് മുമ്പ് ചോദിക്കേണ്ടത്</h3><ul><li>നമ്മൾ എന്താണ് മെച്ചപ്പെടുത്താൻ ശ്രമിക്കുന്നത്?</li><li>ഈ വിവരം ആരാണ് ഉപയോഗിക്കുക?</li><li>എത്ര ഇടവേളയിൽ ഇത് പരിശോധിക്കണം?</li><li>ഈ കണക്കിന്റെ അടിസ്ഥാനത്തിൽ എന്ത് നടപടി എടുക്കാം?</li></ul><div class='callout'><b>യഥാർത്ഥ ഉദാഹരണം</b><p>മാസത്തിലെ ആശുപത്രി കളക്ഷൻ വർധിക്കുന്നുണ്ടോ എന്ന് മാനേജ്മെന്റ് ചോദിക്കുന്നു. ഓരോ മാസത്തെയും മൊത്തം കളക്ഷൻ മുൻ മാസത്തോടും ലക്ഷ്യത്തോടും താരതമ്യം ചെയ്യാം.</p></div><h3>കെ പി ഐ വ്യക്തമായി നിർവചിക്കുക</h3><p>പേര്, ഉദ്ദേശ്യം, ഫോർമുല, യൂണിറ്റ്, റിപ്പോർട്ടിംഗ് ഇടവേള, ഉത്തരവാദി, ഡാറ്റയുടെ ഉറവിടം എന്നിവ രേഖപ്പെടുത്തുക. ബിൽ ചെയ്ത തുകയും യഥാർത്ഥത്തിൽ ലഭിച്ച കളക്ഷനും രണ്ടാണ്; അവ ഒരുപോലെ കാണിക്കരുത്.</p>`,
`<h3>വൃത്തിയുള്ള പട്ടികയിൽ നിന്ന് തുടങ്ങുക</h3><p>ഓരോ വരിയും ഒരു ഇടപാടിനെയും ഓരോ കോളവും അതിന്റെ ഒരു വിവരത്തെയും പ്രതിനിധീകരിക്കുന്ന രീതിയിൽ ഡാറ്റ ക്രമീകരിക്കുക. ബില്ലിംഗ് പട്ടികയിൽ BillID, BillDate, Department, GrossAmount, Discount, NetAmount എന്നിവ ഉണ്ടാകാം.</p><div class='code'>BillID | BillDate  | Department | NetAmount<br>1001 | 01-Nov-26 | OP | 1500<br>1002 | 01-Nov-26 | Lab | 2200<br>1003 | 02-Nov-26 | Pharmacy | 850</div><h3>പവർ ക്വറി ഉപയോഗിക്കുക</h3><ul><li>BillDate ഡാറ്റാ ടൈപ്പ് Date ആക്കുക.</li><li>തുകയുടെ കോളങ്ങൾ Decimal Number ആക്കുക.</li><li>ശൂന്യമായ വരികൾ നീക്കം ചെയ്യുകയും ഡ്യൂപ്ലിക്കേറ്റുകൾ പരിശോധിക്കുകയും ചെയ്യുക.</li><li>വിഭാഗങ്ങളുടെ പേരുകൾ ഒരേ രീതിയിലാക്കുക; അധിക സ്പേസുകൾ നീക്കം ചെയ്യുക.</li><li>കാണാതായ മൂല്യങ്ങളും അസാധാരണമായ നെഗറ്റീവ് തുകയും പരിശോധിക്കുക.</li></ul><h3>ലളിതമായ ഡാറ്റ മോഡൽ നിർമ്മിക്കുക</h3><p>തീയതി അടിസ്ഥാനമാക്കിയുള്ള വിശകലനത്തിന് Date Table സൃഷ്ടിച്ച് Date[Date] നെ Billing[BillDate] മായി ബന്ധിപ്പിക്കുക. പട്ടിക വളരുമ്പോൾ Department പോലുള്ള വിവരങ്ങൾ വേറെ dimension table-ൽ സൂക്ഷിക്കാം.</p><div class='callout'><b>ഡാറ്റാ ഗുണനിലവാര നിയമം</b><p>സംശയാസ്പദമായ ഇടപാട് പരിശോധിക്കാതെ ഡിലീറ്റ് ചെയ്യരുത്. ഉറവിടം പരിശോധിച്ച് തിരുത്തൽ രേഖപ്പെടുത്തുക.</p></div>`,
`<h3>മെഷർ എന്താണ്?</h3><p>നിലവിലെ ഫിൽറ്ററുകൾ അനുസരിച്ച് കണക്കു കണ്ടെത്തുന്ന DAX ഫോർമുലയാണ് മെഷർ. തീയതി, വിഭാഗം എന്നിവ മാറ്റുമ്പോൾ ഫലം മാറും.</p><div class='code'>Total Collections =<br>SUM(Billing[NetAmount])</div><p>ബിൽ ചെയ്ത തുകയും ലഭിച്ച തുകയും വേർതിരിച്ചാണ് സൂക്ഷിക്കുന്നതെങ്കിൽ അവയ്ക്ക് പ്രത്യേകം മെഷറുകൾ സൃഷ്ടിക്കുക.</p><div class='code'>Total Bills =<br>DISTINCTCOUNT(Billing[BillID])<br><br>Average Bill Value =<br>DIVIDE([Total Collections], [Total Bills], 0)</div><h3>മുൻ മാസവുമായി താരതമ്യം ചെയ്യുക</h3><p>തുടർച്ചയായ Date Table, ശരിയായ relationship എന്നിവ ഉപയോഗിച്ച് മുൻ മാസത്തെ കളക്ഷൻ കണക്കാക്കാം.</p><div class='code'>Previous Month Collections =<br>CALCULATE([Total Collections], DATEADD('Date'[Date], -1, MONTH))</div><div class='code'>MoM Change % =<br>DIVIDE([Total Collections] - [Previous Month Collections], [Previous Month Collections])</div><p>ശതമാന മെഷർ Percentage ആയി ഫോർമാറ്റ് ചെയ്യുക. പ്രസിദ്ധീകരിക്കുന്നതിന് മുമ്പ് അറിയാവുന്ന സാമ്പിൾ കണക്കുകളുമായി പരിശോധിക്കുക.</p><h3>ഫിൽറ്റർ കോൺടെക്സ്റ്റ് മനസ്സിലാക്കുക</h3><p>ഉപയോക്താവ് Lab വിഭാഗം തിരഞ്ഞെടുക്കുമ്പോൾ അതേ Total Collections മെഷർ ലാബിന്റെ കളക്ഷൻ മാത്രം കണക്കാക്കും. അതുകൊണ്ടാണ് ഒരേ മെഷർ പല റിപ്പോർട്ടുകളിലും ഉപയോഗിക്കാൻ കഴിയുന്നത്.</p>`,
`<h3>ഉപയോഗപ്രദമായ ഒരു പേജ് റിപ്പോർട്ട് നിർമ്മിക്കുക</h3><ul><li>കാർഡ്: മൊത്തം കളക്ഷൻ.</li><li>കാർഡ്: ശരാശരി ബിൽ തുക.</li><li>കാർഡ്: മാസാന്തര മാറ്റത്തിന്റെ ശതമാനം.</li><li>ലൈൻ ചാർട്ട്: മാസം അനുസരിച്ചുള്ള കളക്ഷൻ.</li><li>ബാർ ചാർട്ട്: വിഭാഗം അനുസരിച്ചുള്ള കളക്ഷൻ.</li><li>സ്ലൈസർ: തീയതിയും വിഭാഗവും.</li></ul><h3>തീരുമാനങ്ങൾ എടുക്കാൻ സഹായിക്കുന്ന രൂപകൽപ്പന</h3><p>വ്യക്തമായ തലക്കെട്ടും വായിക്കാൻ എളുപ്പമുള്ള ലേബലുകളും ഒരേ നമ്പർ ഫോർമാറ്റും ഉപയോഗിക്കുക. ബന്ധപ്പെട്ട ചാർട്ടുകൾ ഒരുമിച്ച് വയ്ക്കുക. അനാവശ്യ 3D ചാർട്ടുകളും അധിക നിറങ്ങളും ഒഴിവാക്കുക. കളക്ഷൻ എന്നതിൽ എന്തെല്ലാം ഉൾപ്പെടുന്നു എന്ന് കുറിപ്പായി വ്യക്തമാക്കുക.</p><h3>ചാർട്ടുകളുടെ പ്രവർത്തനം പരിശോധിക്കുക</h3><p>ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുമ്പോൾ ബന്ധപ്പെട്ട ചാർട്ടുകൾ മാറുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക. തീയതി ഫിൽറ്ററുകൾ, മൊത്തം കണക്കുകൾ, ശൂന്യമായ കാലയളവുകൾ എന്നിവ പരിശോധിക്കുക. അനുമതിയില്ലാത്തവർക്ക് രോഗികളുടെ സ്വകാര്യ വിവരങ്ങൾ കാണാൻ കഴിയരുത്.</p><div class='callout'><b>ഡാഷ്ബോർഡ് ഉദാഹരണം</b><p>കഴിഞ്ഞ മാസത്തെ അപേക്ഷിച്ച് കളക്ഷൻ 8% വർധിച്ചു. ലാബ് വിഭാഗമാണ് ഏറ്റവും കൂടുതൽ സംഭാവന ചെയ്തത്. അവസാന ആഴ്ചയിലെ ഒ പി കളക്ഷൻ കുറവ് പരിശോധിക്കണം. യഥാർത്ഥ ഡാറ്റ പിന്തുണയ്ക്കുന്നുവെങ്കിൽ മാത്രം ഇത്തരം നിഗമനങ്ങൾ പറയുക.</p></div>`,
`<h3>പങ്കിടുന്നതിന് മുമ്പ് പരിശോധിക്കുക</h3><ul><li>Power BI മൊത്തം വിശ്വസനീയമായ ഉറവിട റിപ്പോർട്ടുമായി താരതമ്യം ചെയ്യുക.</li><li>ചില ഇടപാടുകൾ നേരിട്ട് പരിശോധിക്കുക.</li><li>തീയതി പരിധികളും വിഭാഗ ഫിൽറ്ററുകളും ഉറപ്പാക്കുക.</li><li>ശൂന്യമായ, ഡ്യൂപ്ലിക്കേറ്റ്, റിവേഴ്സ് ചെയ്ത ഇടപാടുകൾ പരിശോധിക്കുക.</li><li>റിപ്പോർട്ട് ഉപയോഗിക്കുന്ന മറ്റൊരാളോട് പേജ് പരീക്ഷിക്കാൻ പറയുക.</li></ul><h3>ഇൻസൈറ്റ് വിശദീകരിക്കുക</h3><p>എന്താണ് സംഭവിച്ചത്? എന്തുമായി താരതമ്യം ചെയ്തു? എന്തുകൊണ്ടായിരിക്കാം? ഇനി എന്താണ് പരിശോധിക്കേണ്ടത് അല്ലെങ്കിൽ ചെയ്യേണ്ടത്? ഈ ക്രമത്തിൽ വിശദീകരിക്കുക.</p><h3>ഉത്തരവാദിത്തത്തോടെ പ്രസിദ്ധീകരിക്കുക</h3><p>സ്ഥാപനത്തിന്റെ അംഗീകൃത Power BI workspace-ഉം access permissions-ഉം മാത്രം ഉപയോഗിക്കുക. ആശുപത്രി, രോഗി വിവരങ്ങൾ കൈകാര്യം ചെയ്യുമ്പോൾ സ്വകാര്യതയും സുരക്ഷയും പാലിക്കുക. തിരിച്ചറിയാൻ കഴിയുന്ന രോഗിവിവരങ്ങൾ പൊതുവായി പ്രസിദ്ധീകരിക്കരുത്.</p><div class='callout'><b>ഇന്നത്തെ പഠന ലക്ഷ്യം</b><p>കെ പി ഐ നിർവചിക്കുക, ചെറിയ ഡാറ്റാസെറ്റ് വൃത്തിയാക്കുക, DAX മെഷർ എഴുതുക, ഡാഷ്ബോർഡ് നിർമ്മിക്കുക, മൊത്തം പരിശോധിക്കുക, ഡാറ്റയുടെ അടിസ്ഥാനത്തിൽ ഒരു ഇൻസൈറ്റ് വിശദീകരിക്കുക.</p></div>`
];
const MALAYALAM_CHALLENGE = 'കുറഞ്ഞത് 10 വരികളും 3 വിഭാഗങ്ങളും ഉള്ള ഒരു Billing പട്ടിക തയ്യാറാക്കുക. അത് Power BI-യിലേക്ക് ഇറക്കുമതി ചെയ്യുക. തീയതിയും തുകയുടെ കോളങ്ങളും വൃത്തിയാക്കുക. Total Collections, Average Bill Value എന്നീ മെഷറുകൾ സൃഷ്ടിക്കുക. രണ്ട് കാർഡുകൾ, മാസാന്തര ട്രെൻഡ്, വിഭാഗം അനുസരിച്ചുള്ള ബാർ ചാർട്ട് എന്നിവയുള്ള ഒരു റിപ്പോർട്ട് നിർമ്മിക്കുക. മൊത്തം തുക Excel-ുമായി താരതമ്യം ചെയ്ത് പരിശോധിക്കുക.';
const MALAYALAM_QUIZ = [
{q:'കെ പി ഐയെ ഏറ്റവും നന്നായി വിവരിക്കുന്ന പ്രസ്താവന ഏതാണ്?',a:['റിപ്പോർട്ടിൽ കാണിക്കുന്ന ഏതൊരു സംഖ്യയും','പ്രധാനപ്പെട്ട ബിസിനസ് ലക്ഷ്യവുമായി ബന്ധപ്പെട്ട അളവ്','അലങ്കാര ചാർട്ട്'],correct:1,why:'ഒരു ലക്ഷ്യത്തിലേക്കുള്ള പുരോഗതി അളക്കുന്ന പ്രസക്തമായ സൂചകമാണ് കെ പി ഐ.'},
{q:'ഒരു transaction table-ൽ ഓരോ വരിയും എന്തിനെ പ്രതിനിധീകരിക്കണം?',a:['ഒരു ഇടപാട്','ഒരു മാസത്തിലെ എല്ലാ ഇടപാടുകളും','ഒരു ചാർട്ട്'],correct:0,why:'ഓരോ ഇടപാടിനും ഓരോ വരി ഉപയോഗിക്കുന്നത് ഫിൽറ്ററിംഗും കണക്കുകൂട്ടലും വിശ്വസനീയമാക്കും.'},
{q:'സുരക്ഷിതമായ division-ന് ഉപയോഗിക്കുന്ന DAX function ഏതാണ്?',a:['SUM','DIVIDE','COUNT'],correct:1,why:'പൂജ്യം കൊണ്ട് ഭാഗിക്കുന്ന സാഹചര്യം DIVIDE കൈകാര്യം ചെയ്യുകയും പകരം ഫലം നൽകുകയും ചെയ്യും.'},
{q:'ഡാഷ്ബോർഡ് പങ്കിടുന്നതിന് മുമ്പ് എന്ത് ചെയ്യണം?',a:['മൊത്തം ശരിയാണെന്ന് കരുതുക','മൊത്തം, ഫിൽറ്ററുകൾ, access permissions എന്നിവ പരിശോധിക്കുക','എല്ലാ ലേബലുകളും നീക്കം ചെയ്യുക'],correct:1,why:'പരിശോധനയും access നിയന്ത്രണവും തെറ്റായ റിപ്പോർട്ടിംഗും ഡാറ്റ ചോർച്ചയും തടയും.'},
{q:'ബിൽ ചെയ്ത തുക ഇതുവരെ അടച്ചിട്ടില്ല. അതിനെ collection എന്ന് വിളിക്കാമോ?',a:['അതെ','ഇല്ല, billing-ഉം cash collection-ഉം വ്യത്യസ്തമാണ്','കാർഡ് visual-ൽ കാണിച്ചാൽ മാത്രം'],correct:1,why:'Collection എന്നത് യഥാർത്ഥത്തിൽ ലഭിച്ച തുകയാണ്; ബിൽ ചെയ്ത തുക മാത്രം അല്ല.'}
];
const MALAYALAM_AUDIO = [
`കെ പി ഐ അഥവാ കീ പെർഫോമൻസ് ഇൻഡിക്കേറ്റർ എന്നത് ഒരു പ്രധാന ബിസിനസ് ലക്ഷ്യം എത്രത്തോളം കൈവരിക്കുന്നു എന്ന് മനസ്സിലാക്കാൻ സഹായിക്കുന്ന അളവുകോലാണ്. എല്ലാ അളവുകളും കെ പി ഐ അല്ല. ഒരു പ്രത്യേക ലക്ഷ്യവുമായി ബന്ധമുള്ള അളവാണ് കെ പി ഐ. ഉദാഹരണത്തിന്, ഒരു ആശുപത്രിയിൽ ദിവസേനയുള്ള വരുമാനം, ഒ പി സന്ദർശനങ്ങൾ, കിടക്കകളുടെ ഉപയോഗനിരക്ക്, ശരാശരി ബിൽ തുക, ഇൻഷുറൻസ് ക്ലെയിം തീർപ്പാക്കാനുള്ള സമയം എന്നിവ നിരീക്ഷിക്കാം. ഓരോ കെ പി ഐയും അടുത്തതായി എന്ത് നടപടി എടുക്കണം എന്ന് തീരുമാനിക്കാൻ സഹായിക്കണം. പവർ ബി ഐ തുറക്കുന്നതിന് മുമ്പ് എന്താണ് മെച്ചപ്പെടുത്തേണ്ടത്, ഈ വിവരം ആരാണ് ഉപയോഗിക്കുന്നത്, എത്ര ഇടവേളയിൽ പരിശോധിക്കണം, ഈ കണക്കിന്റെ അടിസ്ഥാനത്തിൽ എന്ത് നടപടി എടുക്കാം എന്നീ ചോദ്യങ്ങൾ ചോദിക്കുക. മാനേജ്മെന്റ് മാസത്തിലെ ആശുപത്രി കളക്ഷൻ വർധിക്കുന്നുണ്ടോ എന്ന് ചോദിച്ചാൽ, ഓരോ മാസത്തെയും മൊത്തം കളക്ഷൻ മുൻ മാസത്തോടും ലക്ഷ്യത്തോടും താരതമ്യം ചെയ്യാം. കെ പി ഐയുടെ പേര്, ഉദ്ദേശ്യം, ഫോർമുല, യൂണിറ്റ്, റിപ്പോർട്ടിംഗ് ഇടവേള, ഉത്തരവാദി, ഡാറ്റാ ഉറവിടം എന്നിവ വ്യക്തമായി രേഖപ്പെടുത്തണം. ബിൽ ചെയ്ത വരുമാനവും യഥാർത്ഥത്തിൽ ലഭിച്ച കളക്ഷനും രണ്ടാണ്; അവ ഒരുപോലെ കാണിക്കരുത്.`,
`പവർ ബി ഐയിൽ ഓരോ വരിയും ഒരു ഇടപാടിനെയും ഓരോ കോളവും അതിന്റെ ഒരു വിവരത്തെയും പ്രതിനിധീകരിക്കുന്ന രീതിയിൽ പട്ടിക ക്രമീകരിക്കുന്നത് നല്ലതാണ്. ആശുപത്രി ബില്ലിംഗ് പട്ടികയിൽ ബിൽ ഐ ഡി, ബിൽ തീയതി, വിഭാഗം, മൊത്തം തുക, ഡിസ്കൗണ്ട്, നെറ്റ് തുക എന്നിവ ഉണ്ടാകാം. പവർ ക്വറിയിൽ ബിൽ തീയതിയുടെ ഡാറ്റാ ടൈപ്പ് ഡേറ്റ് ആക്കുക. തുകയുടെ കോളങ്ങൾ ഡെസിമൽ നമ്പറായി ക്രമീകരിക്കുക. ശൂന്യമായ വരികൾ നീക്കം ചെയ്യുക, ഡ്യൂപ്ലിക്കേറ്റ് രേഖകൾ പരിശോധിക്കുക, വിഭാഗങ്ങളുടെ പേരുകൾ ഒരേ രീതിയിലാക്കുക, അധിക സ്പേസുകൾ നീക്കം ചെയ്യുക. കാണാതായ മൂല്യങ്ങളും അസാധാരണമായ നെഗറ്റീവ് തുകയും പരിശോധിക്കുക. സമയാധിഷ്ഠിത വിശകലനത്തിന് ഒരു ഡേറ്റ് ടേബിൾ സൃഷ്ടിച്ച് അതിനെ ബില്ലിംഗ് പട്ടികയുമായി ബന്ധിപ്പിക്കുക. സംശയാസ്പദമായ ഇടപാട് പരിശോധിക്കാതെ നിശബ്ദമായി ഡിലീറ്റ് ചെയ്യരുത്. യഥാർത്ഥ രേഖ പരിശോധിച്ച് തിരുത്തൽ രേഖപ്പെടുത്തണം.`,
`ഡാക്സ് മെഷർ എന്നത് നിലവിലെ ഫിൽറ്ററുകൾ അനുസരിച്ച് കണക്കു കണ്ടെത്തുന്ന ഫോർമുലയാണ്. തീയതി, വിഭാഗം തുടങ്ങിയ ഫിൽറ്ററുകൾ മാറ്റുമ്പോൾ ഫലം മാറും. മൊത്തം കളക്ഷൻ കണ്ടെത്താൻ ബില്ലിംഗിലെ നെറ്റ് അമൗണ്ട് കോളം കൂട്ടിച്ചേർക്കാം. ആകെ ബില്ലുകളുടെ എണ്ണം കണ്ടെത്താൻ ബിൽ ഐ ഡിയുടെ വ്യത്യസ്ത രേഖകൾ എണ്ണാം. ശരാശരി ബിൽ തുക കണ്ടെത്താൻ മൊത്തം കളക്ഷനെ ആകെ ബില്ലുകളുടെ എണ്ണത്തിൽ ഭാഗിക്കാം. ബിൽ ചെയ്ത തുകയും ലഭിച്ച തുകയും പ്രത്യേകം സൂക്ഷിക്കുന്നുണ്ടെങ്കിൽ അവയ്ക്കായി വ്യത്യസ്ത മെഷറുകൾ ഉണ്ടാക്കണം. തുടർച്ചയായ ഡേറ്റ് ടേബിളും ശരിയായ റിലേഷൻഷിപ്പും ഉപയോഗിച്ച് മുൻ മാസത്തെ കളക്ഷനും ഈ മാസത്തെ കളക്ഷനിലെ ശതമാന മാറ്റവും കണക്കാക്കാം. ശതമാന മെഷർ പെർസന്റേജ് ഫോർമാറ്റിൽ കാണിക്കുക. റിപ്പോർട്ട് പ്രസിദ്ധീകരിക്കുന്നതിന് മുമ്പ് അറിയാവുന്ന സാമ്പിൾ കണക്കുകളുമായി ഫലം പരിശോധിക്കുക. ഉപയോക്താവ് ലാബ് വിഭാഗം തിരഞ്ഞെടുക്കുമ്പോൾ അതേ മൊത്തം കളക്ഷൻ മെഷർ ലാബിന്റെ കളക്ഷൻ മാത്രം കാണിക്കും. ഇതാണ് ഫിൽറ്റർ കോൺടെക്സ്റ്റിന്റെ പ്രയോജനം.`,
`ഒരു പേജ് ഡാഷ്ബോർഡിൽ മൊത്തം കളക്ഷൻ, ശരാശരി ബിൽ തുക, മാസാന്തര ശതമാന മാറ്റം എന്നിവ കാർഡുകളായി കാണിക്കാം. മാസങ്ങൾ അനുസരിച്ചുള്ള കളക്ഷൻ ലൈൻ ചാർട്ടിലും വിഭാഗം അനുസരിച്ചുള്ള കളക്ഷൻ ബാർ ചാർട്ടിലും കാണിക്കാം. തീയതിക്കും വിഭാഗത്തിനും സ്ലൈസറുകൾ ചേർക്കാം. വ്യക്തമായ തലക്കെട്ട്, ഒരേ രീതിയിലുള്ള നമ്പർ ഫോർമാറ്റ്, വായിക്കാൻ എളുപ്പമുള്ള ലേബലുകൾ എന്നിവ ഉപയോഗിക്കുക. അനാവശ്യമായ ത്രീഡി ചാർട്ടുകളും അധിക നിറങ്ങളും ഒഴിവാക്കുക. കളക്ഷൻ എന്നതിൽ എന്തെല്ലാം ഉൾപ്പെടുന്നു എന്ന് കുറിപ്പായി വ്യക്തമാക്കുക. ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുമ്പോൾ ബന്ധപ്പെട്ട എല്ലാ ചാർട്ടുകളും ശരിയായി മാറുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക. തീയതി ഫിൽറ്ററുകളും മൊത്തം കണക്കുകളും പരിശോധിക്കുക. അനുമതിയില്ലാത്തവർക്ക് രോഗികളുടെ സ്വകാര്യ വിവരങ്ങൾ കാണാൻ കഴിയാത്തവിധം റിപ്പോർട്ട് സുരക്ഷിതമാക്കണം. യഥാർത്ഥ ഡാറ്റ പിന്തുണയ്ക്കുന്ന വിവരങ്ങൾ മാത്രം റിപ്പോർട്ടിൽ പറയുക.`,
`റിപ്പോർട്ട് പങ്കിടുന്നതിന് മുമ്പ് പവർ ബി ഐയിലെ മൊത്തം തുക വിശ്വസനീയമായ ഉറവിട റിപ്പോർട്ടുമായി താരതമ്യം ചെയ്യുക. ചില ഇടപാടുകൾ നേരിട്ട് പരിശോധിക്കുക. തീയതി പരിധികളും വിഭാഗ ഫിൽറ്ററുകളും ശരിയാണെന്ന് ഉറപ്പാക്കുക. ശൂന്യമായതും ഡ്യൂപ്ലിക്കേറ്റുമായതും റിവേഴ്സ് ചെയ്തതുമായ ഇടപാടുകൾ പരിശോധിക്കുക. റിപ്പോർട്ട് ഉപയോഗിക്കുന്ന മറ്റൊരാളോട് പേജ് പരീക്ഷിക്കാൻ പറയുക. ഒരു ഇൻസൈറ്റ് വിശദീകരിക്കുമ്പോൾ എന്താണ് സംഭവിച്ചത്, എന്തുമായി താരതമ്യം ചെയ്തു, എന്തുകൊണ്ടായിരിക്കാം, ഇനി എന്താണ് പരിശോധിക്കേണ്ടത് അല്ലെങ്കിൽ ചെയ്യേണ്ടത് എന്നീ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക. സ്ഥാപനത്തിന്റെ അംഗീകൃത പവർ ബി ഐ വർക്ക്‌സ്‌പേസും ആക്സസ് പെർമിഷനുകളും മാത്രം ഉപയോഗിക്കുക. ആശുപത്രി അല്ലെങ്കിൽ രോഗി സംബന്ധമായ വിവരങ്ങൾ കൈകാര്യം ചെയ്യുമ്പോൾ സ്വകാര്യതയും സുരക്ഷാ നിയമങ്ങളും പാലിക്കുക. തിരിച്ചറിയാൻ കഴിയുന്ന രോഗിവിവരങ്ങൾ പൊതുവായി പ്രസിദ്ധീകരിക്കരുത്.`
];
function speak(){
 if(!('speechSynthesis'in window)){toast('ഈ ബ്രൗസറിൽ ഓഡിയോ ലഭ്യമല്ല.');return;}
 const language=$('#languageSelect')?.value||'en';
 const voices=speechSynthesis.getVoices();
 const utter=new SpeechSynthesisUtterance(language==='ml'?MALAYALAM_AUDIO[section]:(TOPIC.sections[section].title+'. '+$('#lessonBody').innerText));
 utter.rate=.9;
 if(language==='ml'){
   utter.lang='ml-IN';
   const voice=voices.find(v=>v.lang.toLowerCase()==='ml-in')||voices.find(v=>v.lang.toLowerCase().startsWith('ml'));
   if(!voice){toast('Malayalam voice is not available on this device. Enable or install a Malayalam text-to-speech voice in your device settings, then try again.');return;}
   utter.voice=voice;
 }else{
   utter.lang='en-IN';
   utter.voice=voices.find(v=>v.lang.toLowerCase()==='en-in')||voices.find(v=>v.lang.toLowerCase().startsWith('en'))||null;
 }
 speechSynthesis.cancel();
 utter.onstart=()=>$('#audioBtn').textContent='♫ Playing';
 utter.onend=()=>$('#audioBtn').textContent='▶ Listen';
 utter.onerror=()=>$('#audioBtn').textContent='▶ Listen';
 speechSynthesis.speak(utter);
}
function applyLanguageUI(){
 const ml=currentLang()==='ml';
 const cards=document.querySelectorAll('#practice .practice-card');
 if(cards[0]){
  cards[0].querySelector('.eyebrow').textContent=ml?'പഠിച്ചത് പ്രയോഗിക്കുക':'APPLY WHAT YOU LEARNED';
  cards[0].querySelector('h2').textContent=ml?'ഇന്നത്തെ പ്രായോഗിക ചലഞ്ച്':"Today's practical challenge";
  cards[0].querySelector('.note-label').textContent=ml?'എന്റെ പഠന കുറിപ്പുകൾ':'My learning notes';
  $('#myNotes').placeholder=ml?'ഇന്ന് പഠിച്ചതും നിങ്ങളുടെ ഉദാഹരണങ്ങളും സംശയങ്ങളും ഇവിടെ എഴുതുക...':'Write what you learned, your own example, or questions to revisit...';
  $('#saveNotes').textContent=ml?'കുറിപ്പുകൾ സേവ് ചെയ്യുക':'Save my notes';
 }
 if(cards[1]){
  cards[1].querySelector('.eyebrow').textContent=ml?'നിങ്ങളുടെ അറിവ് പരിശോധിക്കുക':'CHECK YOUR UNDERSTANDING';
  cards[1].querySelector('h2').textContent=ml?'അവസാന അറിവ് പരിശോധന':'Final knowledge test';
 }
 const audioCopy=document.querySelector('.audio-copy');
 if(audioCopy){audioCopy.querySelector('b').textContent=ml?'കേട്ട് പഠിക്കുക':'Listen and learn';audioCopy.querySelector('small').textContent=ml?'തിരഞ്ഞെടുത്ത ഭാഷയിൽ പാഠം കേൾക്കുക.':'Listen to the lesson in your selected language.';}
 const games=document.querySelector('#learningGames .section-head h2');
 if(games)games.textContent=ml?'പഠന ഗെയിമുകൾ':'Learning games';
 const finish=$('#finishCard');
 if(finish){finish.querySelector('.eyebrow').textContent=ml?'ദൈനംദിന നേട്ടം':'DAILY ACHIEVEMENT';finish.querySelector('h2').textContent=ml?'ഇന്നത്തെ വിഷയം പൂർത്തിയായോ?':'Topic completed?';finish.querySelector('p').textContent=ml?'അഞ്ച് വിഭാഗങ്ങളും പൂർത്തിയാക്കി അവസാന പരീക്ഷയിൽ കുറഞ്ഞത് 80% നേടുക.':'Finish all five sections and score at least 80% in the final assessment.';if(!data.finished)$('#finishBtn').textContent=ml?'ഇന്നത്തെ വിഷയം പൂർത്തിയാക്കുക':'Complete today’s topic';$('#certificatePrompt').textContent=ml?'ഇന്നത്തെ വിഷയം പൂർത്തിയായി! നിങ്ങളുടെ ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റ് തയ്യാറാക്കാം.':'Your topic is complete! Generate your digital certificate.';$('#showCertificateForm').textContent=ml?'സർട്ടിഫിക്കറ്റ് തയ്യാറാക്കുക':'Generate certificate';$('#certificateName').placeholder=ml?'സർട്ടിഫിക്കറ്റിൽ കാണിക്കേണ്ട പൂർണ്ണ പേര് നൽകുക':'Enter your complete name';$('#downloadCertificate').textContent=ml?'സർട്ടിഫിക്കറ്റ് തയ്യാറാക്കി ഡൗൺലോഡ് ചെയ്യുക ↓':'Generate & download certificate ↓';}
}
$('#languageSelect').addEventListener('change',()=>{speechSynthesis?.cancel();answers={};data.quiz=null;save();showSection(section);$('#challenge').textContent=currentLang()==='ml'?MALAYALAM_CHALLENGE:TOPIC.challenge;applyLanguageUI();renderQuiz();$('#audioBtn').textContent=currentLang()==='ml'?'▶ കേൾക്കുക':'▶ Listen';});$('#audioBtn').onclick=speak;$('#pauseBtn').onclick=()=>{if(speechSynthesis.speaking)speechSynthesis.paused?speechSynthesis.resume():speechSynthesis.pause()};$('#stopBtn').onclick=()=>{speechSynthesis.cancel();$('#audioBtn').textContent='▶ Listen'};
$('#beginBtn').onclick=()=>$('#lessonArea').scrollIntoView({behavior:'smooth'});$('#prevBtn').onclick=()=>showSection(section-1);$('#nextBtn').onclick=()=>showSection(section+1);
$('#doneBtn').onclick=()=>{if(!data.done.includes(section))data.done.push(section);save();showSection(section);toast('Section progress saved!');if(data.done.length===TOPIC.sections.length)$('#finishCard').scrollIntoView({behavior:'smooth'});};
$('#challenge').textContent=currentLang()==='ml'?MALAYALAM_CHALLENGE:TOPIC.challenge;$('#myNotes').value=data.notes;
$('#saveNotes').onclick=()=>{data.notes=$('#myNotes').value;save();toast('Your notes are saved on this device.');};
$('#finishBtn').onclick=()=>{if(data.done.length!==TOPIC.sections.length){toast(currentLang()==='ml'?'ആദ്യം അഞ്ച് വിഭാഗങ്ങളും പൂർത്തിയാക്കുക.':'Complete all five sections first.');return;}if(data.quiz===null||data.quiz<80){toast(currentLang()==='ml'?'സർട്ടിഫിക്കറ്റിന് കുറഞ്ഞത് 80% സ്കോർ നേടണം.':'Score at least 80% in the final assessment first.');return;}data.finished=true;save();$('#finishBtn').textContent=currentLang()==='ml'?'പൂർത്തിയായി ✓':'Completed ✓';$('#certificatePanel').hidden=false;toast(currentLang()==='ml'?'അഭിനന്ദനങ്ങൾ! ഇന്നത്തെ വിഷയം പൂർത്തിയായി.':'Congratulations! Today’s topic is complete. 🏆');};
$('#showCertificateForm').onclick=()=>{$('#certificateForm').hidden=false;$('#certificateName').focus();};
$('#downloadCertificate').onclick=()=>{
 const name=$('#certificateName').value.trim();
 if(!data.finished){toast('Complete today’s topic first.');return;}
 if(!name){toast(currentLang()==='ml'?'സർട്ടിഫിക്കറ്റിൽ കാണിക്കേണ്ട പൂർണ്ണ പേര് നൽകുക.':'Please enter your complete name.');$('#certificateName').focus();return;}
 const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=1100;const ctx=canvas.getContext('2d');
 ctx.fillStyle='#fbfaf7';ctx.fillRect(0,0,1600,1100);ctx.strokeStyle='#20243a';ctx.lineWidth=18;ctx.strokeRect(42,42,1516,1016);ctx.strokeStyle='#d8d1bd';ctx.lineWidth=3;ctx.strokeRect(66,66,1468,968);
 ctx.textAlign='center';ctx.fillStyle='#161a2b';ctx.font='700 32px Arial';ctx.fillText('CERTIFICATE OF COMPLETION',800,190);
 ctx.font='700 54px Arial';const brand='adiinnoVation';const metrics=ctx.measureText(brand);let x=(1600-metrics.width)/2;ctx.textAlign='left';for(const ch of brand){ctx.fillStyle=ch==='V'?'#e32935':'#151515';ctx.fillText(ch,x,300);x+=ctx.measureText(ch).width;}ctx.textAlign='center';
 ctx.fillStyle='#686b78';ctx.font='28px Arial';ctx.fillText('DAILY LEARNING ACHIEVEMENT',800,365);ctx.font='30px Arial';ctx.fillText('This certificate is proudly presented to',800,465);
 ctx.fillStyle='#25294a';ctx.font='bold 58px Georgia';ctx.fillText(name,800,555);
 ctx.strokeStyle='#c7b98e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(330,590);ctx.lineTo(1270,590);ctx.stroke();
 ctx.fillStyle='#666';ctx.font='26px Arial';ctx.fillText('for successfully completing today’s learning topic',800,665);
 ctx.fillStyle='#20243a';ctx.font='bold 38px Arial';wrapCanvasText(ctx,TOPIC.title,800,735,1280,48); // Certificate topic is always displayed in English.
 ctx.fillStyle='#444';ctx.font='28px Arial';ctx.fillText('Assessment Score: '+data.quiz+'%',800,855);ctx.fillText('Learning Duration: '+TOPIC.duration+' minutes',800,910);ctx.fillText('Date: '+new Date().toLocaleDateString('en-IN'),800,965);
 ctx.textAlign='left';ctx.fillStyle='#e32935';ctx.fillRect(130,990,1340,5);ctx.textAlign='center';ctx.fillStyle='#6c6c76';ctx.font='20px Arial';ctx.fillText('Digitally issued by adiinnoVation Daily',800,1025);
 const link=document.createElement('a');link.download='adiinnovation-certificate-'+name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.png';link.href=canvas.toDataURL('image/png');link.click();toast(currentLang()==='ml'?'സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്തു.':'Your certificate has been downloaded.');
};
function wrapCanvasText(ctx,text,cx,y,maxWidth,lineHeight){const words=text.split(' ');let line='',lines=[];for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);lines.forEach((ln,i)=>ctx.fillText(ln,cx,y+i*lineHeight));}

$('#resetBtn').onclick=()=>{if(confirm('Reset today’s lesson progress, quiz and notes?')){localStorage.removeItem(storeKey);data={done:[],quiz:null,notes:'',finished:false};$('#certificatePanel').hidden=true;$('#certificateForm').hidden=true;$('#certificateName').value='';answers={};$('#myNotes').value='';$('#quizResult').textContent='';renderQuiz();showSection(0);renderProgress();toast('Today’s topic has been reset.');}};
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('ss-dark',document.body.classList.contains('dark'));};if(localStorage.getItem('ss-dark')==='true')document.body.classList.add('dark');
document.querySelectorAll('.bottom-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.bottom-nav a').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;$('#installBtn').hidden=false;});$('#installBtn').onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$('#installBtn').hidden=true;};
if('serviceWorker'in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderPlan();applyLanguageUI();renderQuiz();showSection(0);renderProgress();if(data.finished){$('#finishBtn').textContent=currentLang()==='ml'?'പൂർത്തിയായി ✓':'Completed ✓';$('#certificatePanel').hidden=false;}


// Topic-linked mini games
const GAME_BANK = {
  match: {
    title: 'Match the Power BI terms',
    instructions: 'Choose a term on the left, then its matching meaning on the right.',
    pairs: [
      ['Power Query', 'Clean and transform data'],
      ['DAX', 'Formula language for calculations'],
      ['KPI', 'Measure linked to a business goal'],
      ['Relationship', 'Connects tables in a data model']
    ]
  },
  truefalse: {
    title: 'True or false?',
    instructions: 'Read each statement and choose the correct answer.',
    questions: [
      {q:'A KPI should help track progress towards an important objective.',a:true,why:'Correct. A KPI measures progress towards a meaningful business goal.'},
      {q:'Power Query is mainly used to create DAX measures.',a:false,why:'Power Query prepares and transforms data. DAX is used to create model calculations.'},
      {q:'A transaction table commonly has one row per transaction.',a:true,why:'That structure makes filtering and aggregation easier.'},
      {q:'Billed revenue and cash collections always mean the same thing.',a:false,why:'Billing records amounts charged; collections record amounts actually received.'}
    ]
  },
  scenario: {
    title: 'Real-life hospital challenge',
    instructions: 'Use what you learned to choose the best next step.',
    questions: [
      {q:'A hospital manager wants to compare monthly collections. What should you build first?',opts:['A monthly collections measure and date-based analysis','A decorative title page','A list of staff birthdays'],a:0,why:'Start with a clearly defined collections measure and a reliable date table.'},
      {q:'The dashboard total does not match the finance register. What should you do?',opts:['Publish it anyway','Validate source data, filters and calculations','Hide the total'],a:1,why:'Always reconcile the result and investigate differences before sharing.'},
      {q:'Management selects the Lab department. What should a well-designed measure do?',opts:['Show only Lab results','Stop calculating','Change the report title only'],a:0,why:'Filter context should let the measure respond to the selected department.'}
    ]
  }
};
let gameType='match', gamePoints=0, matchFirst=null, matchFound=[], gameQuestion=0, gameLocked=false;
function shuffleList(a){return [...a].sort(()=>Math.random()-.5)}
function updateGameScore(){ $('#gameScore').textContent='⭐ '+gamePoints+' points'; }
function setGameFeedback(msg,kind=''){const el=$('#gameFeedback');el.textContent=msg;el.className='game-feedback '+kind;}
function selectGame(type){
  gameType=type;matchFirst=null;matchFound=[];gameQuestion=0;gameLocked=false;
  document.querySelectorAll('.game-tab').forEach(b=>b.classList.toggle('active',b.dataset.game===type));
  const bank=GAME_BANK[type];
  $('#gameLabel').textContent=type==='match'?'GAME 01 · MATCH PAIRS':type==='truefalse'?'GAME 02 · TRUE OR FALSE':'GAME 03 · REAL-LIFE CHALLENGE';
  $('#gameTitle').textContent=bank.title;$('#gameInstructions').textContent=bank.instructions;
  $('#gameNext').hidden=true;setGameFeedback('');renderGame();
}
function renderGame(){
  const root=$('#gameContent');
  if(gameType==='match'){
    const pairs=GAME_BANK.match.pairs;
    const terms=pairs.map((p,i)=>({id:i,text:p[0],side:'term'}));
    const defs=pairs.map((p,i)=>({id:i,text:p[1],side:'definition'}));
    const all=shuffleList([...terms,...defs]);
    root.innerHTML='<div class="match-grid">'+all.map(x=>`<button class="match-choice ${matchFound.includes(x.id)?'matched':''}" data-pair="${x.id}" data-side="${x.side}" ${matchFound.includes(x.id)?'disabled':''}>${x.text}</button>`).join('')+'</div>';
    root.querySelectorAll('.match-choice:not(:disabled)').forEach(b=>b.onclick=()=>{
      const item={id:+b.dataset.pair,side:b.dataset.side,el:b};
      if(!matchFirst){matchFirst=item;b.classList.add('selected');return;}
      if(matchFirst.side===item.side){matchFirst.el.classList.remove('selected');matchFirst=null;b.classList.add('selected');setGameFeedback('Pick one term and one meaning.');return;}
      if(matchFirst.id===item.id){
        matchFound.push(item.id);gamePoints+=10;updateGameScore();setGameFeedback('Great match! +10 points','good');matchFirst=null;
        if(matchFound.length===pairs.length){root.innerHTML='<div class="callout"><b>All pairs matched!</b><p>You connected all four Power BI concepts correctly.</p></div>';setGameFeedback('Game completed. Excellent work!','good');}
        else renderGame();
      }else{
        b.classList.add('selected');matchFirst.el.classList.remove('selected');setGameFeedback('Not a match. Try another meaning.','bad');matchFirst=null;
        setTimeout(()=>{root.querySelectorAll('.match-choice.selected').forEach(x=>x.classList.remove('selected'));},550);
      }
    });
  } else {
    const qs=GAME_BANK[gameType].questions;
    if(gameQuestion>=qs.length){root.innerHTML='<div class="callout"><b>Challenge completed!</b><p>You finished all questions in this game.</p></div>';setGameFeedback('Well done. Keep practising!','good');$('#gameNext').hidden=true;return;}
    const q=qs[gameQuestion];
    if(gameType==='truefalse'){
      root.innerHTML=`<div class="quiz-question">${gameQuestion+1}. ${q.q}</div><div class="game-options"><button class="tf-choice" data-val="true">True</button><button class="tf-choice" data-val="false">False</button></div>`;
      root.querySelectorAll('.tf-choice').forEach(b=>b.onclick=()=>gradeGameAnswer((b.dataset.val==='true')===q.a,b,q.why));
    }else{
      root.innerHTML=`<div class="quiz-question">${gameQuestion+1}. ${q.q}</div><div class="game-options">${q.opts.map((v,i)=>`<button class="scenario-choice" data-index="${i}">${String.fromCharCode(65+i)}. ${v}</button>`).join('')}</div>`;
      root.querySelectorAll('.scenario-choice').forEach(b=>b.onclick=()=>gradeGameAnswer(+b.dataset.index===q.a,b,q.why));
    }
  }
}
function gradeGameAnswer(correct,button,why){
  if(gameLocked)return;gameLocked=true;
  button.classList.add(correct?'correct':'wrong');
  if(correct){gamePoints+=10;updateGameScore();setGameFeedback('Correct! +10 points. '+why,'good');}
  else setGameFeedback('Good try. '+why,'bad');
  $('#gameContent').querySelectorAll('button').forEach(b=>b.disabled=true);
  $('#gameNext').hidden=false;
  $('#gameNext').textContent=gameQuestion===GAME_BANK[gameType].questions.length-1?'Finish game':'Next question →';
}
$('#gameNext').onclick=()=>{gameQuestion++;gameLocked=false;$('#gameNext').hidden=true;setGameFeedback('');renderGame();};
$('#gameReset').onclick=()=>{gamePoints=0;updateGameScore();selectGame(gameType);};
document.querySelectorAll('.game-tab').forEach(b=>b.onclick=()=>selectGame(b.dataset.game));
selectGame('match');updateGameScore();

