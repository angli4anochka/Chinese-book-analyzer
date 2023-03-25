import docx
import re
import collections
import nltk
import jieba.analyse




doc = docx.Document('chinese.docx')
chinese_pattern = re.compile('[\u4e00-\u9fff]+')

with open('chinese_text.txt', 'w', encoding='utf-8') as f:
    for para in doc.paragraphs:
        chinese_text = ''.join(chinese_pattern.findall(para.text))
        f.write(chinese_text)
        text = chinese_text

all_words = []

with open('chinese_text.txt', 'r', encoding='utf-8') as f:
    for line in f:
        words = jieba.lcut(line)
        all_words.extend(words)
        word_counts1 = collections.Counter(all_words)




stop_words = set(nltk.corpus.stopwords.words('chinese'))

filtered_words = []
for word in all_words:
    if word not in stop_words:
        filtered_words.append(word)
        word_counts = collections.Counter(filtered_words)


word_freq = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)

for word, freq in word_freq[:100]:
    print(f'{word}')
















