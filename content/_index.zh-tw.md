---
title: "Jean-Daniel Zucker"
description: "特級研究主任 · IRD/索邦大學 · 人工智能 · 複雜系統 · 宏基因組學"
---

{{< lead >}}
特級研究主任 — 法國發展研究院（IRD）/ 索邦大學
{{< /lead >}}

---

Jean-Daniel Zucker 是法國國立航空航天工程師學院（ISAE-SUPAERO）工程師，並於1996年在索邦大學（巴黎第六大學）取得**機器學習**博士學位。其研究聚焦於人工智能與機器學習——包含可解釋性模型與深度學習——應用於複雜系統建模與醫療決策支持。研究領域涵蓋宏基因組學（腸道菌群）、營養基因組學、流行病學及環境決策。

2014年至2024年，他擔任[UMI UMMISCO](https://www.ummisco.fr/)國際聯合研究室主任（IRD/索邦大學），自2025年1月起轉任副主任。他同時領導索邦大學IHU ICAN的**Integromics**宏基因組學研究小組，並擔任索邦大學及巴黎多芬大學（PSL）電腦科學教授。

**逾25,000次引用 · h指數 57 · 300餘篇學術著作** · [Google Scholar](https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl=zh-TW) · [ResearchGate](https://www.researchgate.net/profile/Jean-Daniel-Zucker)

---

## 研究方向

**人工智能與抽象化** — 表示學習、歸納學習、多實例分類、可解釋評分系統、生物醫學自然語言處理（AliBERT）。

**多智能體系統與複雜系統** — 基於智能體的建模與模擬、GAMA平台、多尺度建模、人群疏散、生態系統。

**宏基因組學與腸道菌群** — 人類腸道微生物組分析、多組學整合、肥胖症、心代謝疾病、代謝手術。

**精準醫療與醫療人工智能** — 糖尿病緩解預測（Advanced-DiaRem評分）、患者分層、生物信息學、心電圖深度學習、藥物警戒。

---

## 職位與任職

| 時期 | 職位 | 機構 |
|:-----|:-----|:-----|
| 2025年至今 | UMI UMMISCO 副主任 | IRD / 索邦大學 |
| 2014–2024 | UMI UMMISCO 主任（72名永久成員） | IRD / 索邦大學 |
| 2007年至今 | 特級研究主任（DRCE） | IRD |
| 2007年至今 | 電腦科學教授 | 索邦大學 & 巴黎多芬大學（PSL） |
| 2010–2015 | 科學委員會主席 | 河內科技大學（USTH） |

---

## 代表性著作

| 論文 | 期刊 | 年份 | 引用次數 |
|:-----|:-----|:----:|--------:|
| Le Chatelier *et al.* — 人類腸道微生物組豐富度與代謝指標的關聯 | *Nature* 500 | 2013 | 逾5,000 |
| Dao *et al.* — 飲食干預中*Akkermansia muciniphila*與肥胖患者代謝健康的改善 | *Gut* 65 | 2016 | 逾1,900 |
| Cancello *et al.* — 減重後白色脂肪組織中巨噬細胞浸潤的減少 | *Diabetes* 54 | 2005 | 逾1,400 |
| Wang & Zucker — 解決多實例問題：惰性學習方法 | ICML | 2000 | 逾830 |
| Forslund *et al.* — 藥物與腸道菌群的組合、累加及劑量依賴性相互作用 | *Nature* 600 | 2021 | 逾170 |

{{< button href="/zh-tw/publications/" target="_self" >}}
查看全部著作 →
{{< /button >}}

---

## 論文引用趨勢（Google Scholar）

<div style="max-width:680px; margin:1.5rem auto 1rem;">
  <canvas id="citationsChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
(function() {
  fetch('/citation_data.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var cpy = data.cites_per_year || {};
      var years = Object.keys(cpy).sort();
      var vals = years.map(function(y){ return cpy[y]; });
      var ctx = document.getElementById('citationsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            data: vals,
            backgroundColor: 'rgba(100,116,139,0.65)',
            borderColor: 'rgba(100,116,139,0.9)',
            borderWidth: 1,
            borderRadius: 3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: '每年引用次數（Google Scholar）', font: { size: 13 } }
          },
          scales: {
            x: { title: { display: true, text: '年份' } },
            y: { title: { display: true, text: '引用次數' }, beginAtZero: true }
          }
        }
      });
    })
    .catch(function(e){ console.error(e); });
})();
</script>

---

## UMI UMMISCO 合作機構

| 機構 | 國家 |
|:-----|:-----|
| 索邦大學 | 🇫🇷 法國 |
| 卡迪阿亞德大學 | 🇲🇦 摩洛哥 |
| 謝赫·安塔·迪奧普大學 | 🇸🇳 塞內加爾 |
| 加斯頓·貝爾熱大學 | 🇸🇳 塞內加爾 |
| 雅溫得第一大學 | 🇨🇲 喀麥隆 |
| 河內科技大學 | 🇻🇳 越南 |
