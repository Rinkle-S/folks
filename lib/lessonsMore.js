// Lessons for Uber, Rapido, YouTube and Swiggy. Same shape as the lessons in lessons.js.
const start = { en: 'Start', hi: 'शुरू करें' };

export const MORE_LESSONS = {
  'uber-cab': {
    id: 'uber-cab',
    icon: 'car',
    app: 'uber',
    appName: 'Uber',
    emoji: '🚕',
    minutes: 3,
    title: { en: 'Book a cab with Uber', hi: 'Uber से कैब बुक करें' },
    takeaways: {
      en: [
        "Start with the big 'Where to?' box",
        'The fare is shown before you book',
        'Match the car number before you get in, then share your trip',
      ],
      hi: [
        "बड़े 'Where to?' वाले डिब्बे से शुरू करें",
        'किराया बुक करने से पहले दिख जाता है',
        'बैठने से पहले गाड़ी का नंबर मिलाएं, फिर अपनी यात्रा share करें',
      ],
    },
    share: { en: 'I learned to book an Uber cab on Nook! 🚕', hi: 'मैंने Nook पर Uber कैब बुक करना सीख लिया! 🚕' },
    realTry: {
      en: 'Next time you need a cab, book it on your real Uber with the same steps. Share the trip with family.',
      hi: 'अगली बार कैब चाहिए, तो अपने असली Uber पर ऐसे ही बुक कीजिए। यात्रा परिवार के साथ share कीजिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll book an Uber cab to City Hospital, check the car, and share the trip with family. This is only practice. No cab will come and no money is spent.",
          hi: 'आज हम Uber से सिटी हॉस्पिटल के लिए कैब बुक करेंगे, गाड़ी जांचेंगे, और यात्रा परिवार के साथ share करेंगे। यह सिर्फ़ अभ्यास है। कोई कैब नहीं आएगी, कोई पैसा नहीं कटेगा।',
        },
        button: start,
      },
      {
        id: 'where',
        screen: 'ub-home',
        kind: 'tap',
        target: 'where',
        say: { en: "This is Uber. Tap the big grey box that says 'Where to?'.", hi: "यह Uber है। 'Where to?' लिखे बड़े सलेटी डिब्बे को दबाइए।" },
        hint: { en: "Tap the grey box near the top, with 'Where to?' in it.", hi: "ऊपर सलेटी डिब्बा, जिसमें 'Where to?' लिखा है, उसे दबाइए।" },
      },
      {
        id: 'place',
        screen: 'ub-search',
        kind: 'tap',
        target: 'place',
        say: {
          en: "Uber already knows where you are. Now choose where you are going. Tap 'City Hospital'.",
          hi: "Uber को पता है कि आप अभी कहाँ हैं। अब बताइए कहाँ जाना है। 'City Hospital' दबाइए।",
        },
        hint: { en: "Tap 'City Hospital', the first place in the list.", hi: "लिस्ट में पहली जगह, 'City Hospital', दबाइए।" },
      },
      {
        id: 'pick-ride',
        screen: 'ub-rides',
        kind: 'tap',
        target: 'ride-go',
        say: {
          en: "Uber shows the rides and their fares before you book. Uber Go is a small car for 186 rupees. Tap 'Uber Go'.",
          hi: "बुक करने से पहले Uber गाड़ियाँ और उनका किराया दिखाता है। Uber Go छोटी कार है, 186 रुपये। 'Uber Go' दबाइए।",
        },
        hint: { en: "Tap the first row, 'Uber Go', 186 rupees.", hi: "पहली लाइन, 'Uber Go', 186 रुपये, दबाइए।" },
      },
      {
        id: 'choose',
        screen: 'ub-rides',
        selected: true,
        kind: 'tap',
        target: 'choose',
        say: {
          en: "It says 'Cash' at the bottom, so you pay the driver in cash at the end. Now tap the black 'Choose Uber Go' button.",
          hi: "नीचे 'Cash' लिखा है, यानी पैसे आख़िर में ड्राइवर को नकद देंगे। अब काला 'Choose Uber Go' बटन दबाइए।",
        },
        hint: { en: 'Tap the long black button at the bottom.', hi: 'सबसे नीचे लंबा काला बटन दबाइए।' },
      },
      {
        id: 'confirm',
        screen: 'ub-pickup',
        kind: 'tap',
        target: 'confirm',
        say: {
          en: "Uber asks where to pick you up. The pin is on your gate. Tap 'Confirm pickup'.",
          hi: "Uber पूछता है कि आपको कहाँ से लेना है। निशान आपके गेट पर है। 'Confirm pickup' दबाइए।",
        },
        hint: { en: "Tap the black 'Confirm pickup' button at the bottom.", hi: "नीचे काला 'Confirm pickup' बटन दबाइए।" },
      },
      {
        id: 'check-car',
        screen: 'ub-driver',
        kind: 'quiz',
        say: {
          en: 'Your driver Rakesh is coming in a white Swift Dzire, number D L 3 C A B 1 2 3 4. A white car stops in front of you. What should you do first?',
          hi: 'आपके ड्राइवर राकेश सफ़ेद स्विफ़्ट डिज़ायर में आ रहे हैं, नंबर D L 3 C A B 1 2 3 4। एक सफ़ेद गाड़ी आपके सामने रुकी। पहले क्या करना चाहिए?',
        },
        options: [
          {
            text: { en: 'Match the number plate with the app', hi: 'गाड़ी का नंबर ऐप से मिलाऊँ' },
            correct: true,
            why: {
              en: "Exactly! Many cars look alike. Only get in if the number matches the one in the app.",
              hi: 'बिल्कुल सही! कई गाड़ियाँ एक जैसी दिखती हैं। नंबर ऐप वाले से मिले, तभी बैठिए।',
            },
          },
          {
            text: { en: "It's white, so just get in", hi: 'सफ़ेद है, बस बैठ जाऊँ' },
            correct: false,
            why: {
              en: 'Careful. Many cars are white. Always match the number plate first.',
              hi: 'ध्यान दीजिए। बहुत सी गाड़ियाँ सफ़ेद होती हैं। पहले हमेशा नंबर मिलाइए।',
            },
          },
        ],
      },
      {
        id: 'ride-pin',
        screen: 'ub-driver',
        kind: 'quiz',
        say: {
          en: 'The app shows your PIN, 4821. The driver needs it to start the ride. When is it okay to tell it?',
          hi: 'ऐप में आपका PIN दिख रहा है, 4821। सवारी शुरू करने के लिए ड्राइवर को यह चाहिए। इसे कब बताना ठीक है?',
        },
        options: [
          {
            text: { en: 'When someone calls and asks for it', hi: 'जब कोई फ़ोन करके पूछे' },
            correct: false,
            why: {
              en: 'No. Never tell it on a phone call. Tell it only to the driver, inside the right car.',
              hi: 'नहीं। फ़ोन पर कभी मत बताइए। सिर्फ़ सही गाड़ी में बैठकर, ड्राइवर को बताइए।',
            },
          },
          {
            text: { en: 'Only after I sit in the right car', hi: 'सही गाड़ी में बैठने के बाद ही' },
            correct: true,
            why: {
              en: 'Right! The PIN makes sure you are in the right car with the right driver.',
              hi: 'सही! PIN से पक्का होता है कि आप सही गाड़ी में, सही ड्राइवर के साथ हैं।',
            },
          },
        ],
      },
      {
        id: 'share',
        screen: 'ub-driver',
        kind: 'tap',
        target: 'share',
        say: {
          en: "Last, let your family follow your ride. Tap 'Share trip status'.",
          hi: "आख़िर में, परिवार को आपकी यात्रा दिखती रहे। 'Share trip status' दबाइए।",
        },
        hint: { en: "Tap 'Share trip status', with the share icon.", hi: "share वाले निशान के साथ 'Share trip status' दबाइए।" },
      },
      {
        id: 'contact',
        screen: 'ub-share',
        kind: 'tap',
        target: 'contact',
        say: { en: "Choose who to send it to. Tap 'Sunita'.", hi: "किसे भेजना है, चुनिए। 'Sunita' दबाइए।" },
        hint: { en: "Tap the pink circle with 'S', Sunita.", hi: "गुलाबी गोले वाला 'S', सुनीता, दबाइए।" },
      },
      {
        id: 'shared',
        screen: 'ub-driver',
        shared: true,
        kind: 'info',
        say: {
          en: 'Shared! Sunita can now see your car and where you are, until you reach. Well done.',
          hi: 'Share हो गया! अब सुनीता आपकी गाड़ी और आप कहाँ हैं, पहुँचने तक देख सकती हैं। शाबाश।',
        },
        button: { en: 'Finish', hi: 'पूरा करें' },
      },
    ],
  },

  'rapido-auto': {
    id: 'rapido-auto',
    icon: 'auto',
    app: 'rapido',
    appName: 'Rapido',
    emoji: '🛺',
    minutes: 3,
    title: { en: 'Book an auto with Rapido', hi: 'Rapido से ऑटो बुक करें' },
    takeaways: {
      en: [
        "Tap 'Where are you going?' and pick the place",
        'Choose Auto. The fare is fixed before you book',
        'Tell the OTP only in person, and pay what the app shows',
      ],
      hi: [
        "'Where are you going?' दबाकर जगह चुनें",
        'Auto चुनें। किराया बुक करने से पहले तय हो जाता है',
        'OTP सिर्फ़ सामने बताएं, और उतना ही दें जितना ऐप में दिखे',
      ],
    },
    share: { en: 'I learned to book an auto on Rapido with Nook! 🛺', hi: 'मैंने Nook पर Rapido से ऑटो बुक करना सीख लिया! 🛺' },
    realTry: {
      en: 'Next time you need an auto, book it on your real Rapido. Pay only the fare shown in the app.',
      hi: 'अगली बार ऑटो चाहिए, तो अपने असली Rapido पर बुक कीजिए। उतना ही किराया दीजिए जितना ऐप में दिखे।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll book an auto to the railway station with Rapido, and pay in cash. This is only practice. No auto will come.",
          hi: 'आज हम Rapido से रेलवे स्टेशन के लिए ऑटो बुक करेंगे, और नकद देंगे। यह सिर्फ़ अभ्यास है। कोई ऑटो नहीं आएगा।',
        },
        button: start,
      },
      {
        id: 'search',
        screen: 'rp-home',
        kind: 'tap',
        target: 'search',
        say: { en: "This is Rapido. Tap the white box, 'Where are you going?'.", hi: "यह Rapido है। सफ़ेद डिब्बा, 'Where are you going?', दबाइए।" },
        hint: { en: 'Tap the white box on the yellow part at the top.', hi: 'ऊपर पीले हिस्से में सफ़ेद डिब्बा दबाइए।' },
      },
      {
        id: 'place',
        screen: 'rp-search',
        kind: 'tap',
        target: 'place',
        say: {
          en: "Your pickup is where you are now. Now choose where to go. Tap 'Railway Station'.",
          hi: "आप जहाँ हैं, वहीं से ले जाएंगे। अब बताइए कहाँ जाना है। 'Railway Station' दबाइए।",
        },
        hint: { en: "Tap 'Railway Station', the first place.", hi: "पहली जगह, 'Railway Station', दबाइए।" },
      },
      {
        id: 'auto',
        screen: 'rp-rides',
        kind: 'tap',
        target: 'auto',
        say: {
          en: "Rapido shows Bike, Auto and Cab, each with its fare. No bargaining needed. Tap 'Auto', 78 rupees.",
          hi: "Rapido बाइक, ऑटो और कैब, सबका किराया दिखाता है। मोल-भाव की ज़रूरत नहीं। 'Auto', 78 रुपये, दबाइए।",
        },
        hint: { en: "Tap the middle row, 'Auto', 78 rupees.", hi: "बीच वाली लाइन, 'Auto', 78 रुपये, दबाइए।" },
      },
      {
        id: 'book',
        screen: 'rp-rides',
        selected: true,
        kind: 'tap',
        target: 'book',
        say: {
          en: "See 'Cash' at the bottom left? You'll pay the driver in cash. Tap the yellow 'Book Auto' button.",
          hi: "नीचे बाईं तरफ़ 'Cash' लिखा है? पैसे ड्राइवर को नकद देंगे। पीला 'Book Auto' बटन दबाइए।",
        },
        hint: { en: "Tap the yellow 'Book Auto' button at the bottom right.", hi: "नीचे दाईं तरफ़ पीला 'Book Auto' बटन दबाइए।" },
      },
      {
        id: 'otp',
        screen: 'rp-captain',
        kind: 'quiz',
        say: {
          en: 'Rapido calls the driver a captain. Manjunath is coming in auto number K A 0 1 A B 4 5 2 1. When he arrives, he asks for your OTP, 5 1 7 2. What do you do?',
          hi: 'Rapido ड्राइवर को captain कहता है। मंजुनाथ ऑटो नंबर K A 0 1 A B 4 5 2 1 में आ रहे हैं। पहुँचकर वो आपसे OTP, 5 1 7 2, मांगेंगे। आप क्या करेंगे?',
        },
        options: [
          {
            text: { en: 'Check the auto number, then tell the OTP', hi: 'ऑटो का नंबर मिलाकर OTP बताऊँ' },
            correct: true,
            why: {
              en: 'Right! The OTP starts the ride, so tell it in person, only in the right auto.',
              hi: 'सही! OTP से सवारी शुरू होती है, इसलिए सामने ही बताइए, सिर्फ़ सही ऑटो में।',
            },
          },
          {
            text: { en: 'Tell it on a phone call before he comes', hi: 'आने से पहले फ़ोन पर बता दूँ' },
            correct: false,
            why: {
              en: 'No. Never tell an OTP on the phone. Tell it only in person, after checking the auto number.',
              hi: 'नहीं। OTP फ़ोन पर कभी मत बताइए। ऑटो का नंबर मिलाकर, सामने ही बताइए।',
            },
          },
        ],
      },
      {
        id: 'fare',
        screen: 'rp-end',
        kind: 'quiz',
        say: {
          en: "You've reached the station. The captain says: 'Give me 120 rupees.' The app says 78. How much do you pay?",
          hi: "आप स्टेशन पहुँच गए। captain कहते हैं: '120 रुपये दीजिए।' ऐप में 78 लिखा है। आप कितने देंगे?",
        },
        options: [
          {
            text: { en: '120 rupees, whatever he asks', hi: '120 रुपये, जितना वो मांगें' },
            correct: false,
            why: {
              en: 'No. The fare was fixed when you booked. Pay what the app shows. If he argues, use Help in the app.',
              hi: 'नहीं। किराया बुक करते समय तय हो गया था। ऐप में जितना दिखे, उतना दीजिए। बहस हो, तो ऐप में Help दबाइए।',
            },
          },
          {
            text: { en: '78 rupees, as the app shows', hi: '78 रुपये, जितना ऐप में दिखे' },
            correct: true,
            why: {
              en: 'Correct! Pay what the app shows. If someone asks for more, use Help in the app.',
              hi: 'सही! ऐप में जितना दिखे, उतना दीजिए। कोई ज़्यादा मांगे, तो ऐप में Help दबाइए।',
            },
          },
        ],
      },
      {
        id: 'rate',
        screen: 'rp-end',
        kind: 'tap',
        target: 'stars',
        say: { en: 'Last, rate your ride. Tap the stars.', hi: 'आख़िर में, सवारी को रेटिंग दीजिए। तारों को दबाइए।' },
        hint: { en: 'Tap the row of grey stars at the bottom.', hi: 'नीचे सलेटी तारों वाली लाइन दबाइए।' },
      },
    ],
  },

  'youtube-play': {
    id: 'youtube-play',
    icon: 'play',
    app: 'youtube',
    appName: 'YouTube',
    emoji: '🙏',
    minutes: 2,
    title: { en: 'Find and play a song on YouTube', hi: 'YouTube पर गाना ढूंढकर चलाएं' },
    takeaways: {
      en: [
        'The magnifying glass at the top is for search',
        "Wait for 'Skip' on ads. Don't tap 'Install'",
        'The square corners button makes the video big',
      ],
      hi: [
        'ऊपर वाला लेंस का निशान ढूंढने के लिए है',
        "विज्ञापन पर 'Skip' का इंतज़ार करें। 'Install' मत दबाएं",
        'चौकोर कोनों वाला बटन वीडियो को बड़ा करता है',
      ],
    },
    share: { en: 'I learned to find songs on YouTube with Nook! 🙏', hi: 'मैंने Nook पर YouTube में गाना ढूंढना सीख लिया! 🙏' },
    realTry: {
      en: 'Open your real YouTube and find your favourite song the same way.',
      hi: 'अपना असली YouTube खोलिए और अपना पसंदीदा गाना ऐसे ही ढूंढिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll find an old song on YouTube, skip the ad, and watch it big on the full screen.",
          hi: 'आज हम YouTube पर पुराने गाने ढूंढेंगे, विज्ञापन हटाएंगे, और पूरी स्क्रीन पर बड़ा करके देखेंगे।',
        },
        button: start,
      },
      {
        id: 'search',
        screen: 'yt-home',
        kind: 'tap',
        target: 'search',
        say: {
          en: 'This is YouTube. To find a video, tap the magnifying glass at the top right.',
          hi: 'यह YouTube है। वीडियो ढूंढने के लिए, ऊपर दाईं तरफ़ लेंस का निशान दबाइए।',
        },
        hint: { en: 'Tap the magnifying glass, the last icon at the top right.', hi: 'ऊपर दाईं तरफ़ आख़िरी निशान, लेंस, दबाइए।' },
      },
      {
        id: 'suggest',
        screen: 'yt-search',
        kind: 'tap',
        target: 'suggest',
        say: {
          en: "Here you type what you want, or tap the mic and say it. We've typed 'old songs' for you. Tap the first suggestion.",
          hi: "यहाँ लिखिए कि क्या देखना है, या माइक दबाकर बोलिए। हमने 'old songs' लिख दिया है। पहला सुझाव दबाइए।",
        },
        hint: { en: "Tap the first line, 'old songs'.", hi: "पहली लाइन, 'old songs', दबाइए।" },
      },
      {
        id: 'video',
        screen: 'yt-results',
        kind: 'tap',
        target: 'video',
        say: { en: 'These are the videos. Tap the first one to play it.', hi: 'ये वीडियो हैं। चलाने के लिए पहला वीडियो दबाइए।' },
        hint: { en: 'Tap the first big picture.', hi: 'पहली बड़ी तस्वीर दबाइए।' },
      },
      {
        id: 'ad',
        screen: 'yt-player',
        ad: true,
        kind: 'quiz',
        say: {
          en: 'An ad is playing before your song. It says: Install now! What do you do?',
          hi: 'आपके गाने से पहले एक विज्ञापन चल रहा है। उसमें लिखा है: Install now! आप क्या करेंगे?',
        },
        options: [
          {
            text: { en: "Tap 'Install now'", hi: "'Install now' दबाऊँ" },
            correct: false,
            why: {
              en: "No. That opens the advertiser's app, not your song. Some of these apps are harmful.",
              hi: 'नहीं। उससे विज्ञापन वाला ऐप खुलता है, आपका गाना नहीं। ऐसे कुछ ऐप नुकसान भी करते हैं।',
            },
          },
          {
            text: { en: "Wait, then tap 'Skip'", hi: "रुककर 'Skip' दबाऊँ" },
            correct: true,
            why: {
              en: "Right! After a few seconds, 'Skip' appears at the bottom right. Tap it and the ad goes away.",
              hi: "सही! कुछ सेकंड में नीचे दाईं तरफ़ 'Skip' आता है। उसे दबाइए, विज्ञापन हट जाएगा।",
            },
          },
        ],
      },
      {
        id: 'skip',
        screen: 'yt-player',
        ad: true,
        kind: 'tap',
        target: 'skip',
        say: { en: "Now tap 'Skip' at the bottom right of the video.", hi: "अब वीडियो में नीचे दाईं तरफ़ 'Skip' दबाइए।" },
        hint: { en: "Tap the dark 'Skip' box on the right edge.", hi: "दाएं किनारे पर काला 'Skip' डिब्बा दबाइए।" },
      },
      {
        id: 'fullscreen',
        screen: 'yt-player',
        kind: 'tap',
        target: 'fullscreen',
        say: {
          en: 'Your song is playing. To see it bigger, tap the full screen button: the square corners at the bottom right of the video.',
          hi: 'आपका गाना चल रहा है। बड़ा देखने के लिए, वीडियो में नीचे दाईं तरफ़ चौकोर कोनों वाला बटन दबाइए।',
        },
        hint: { en: 'Tap the four corners icon at the bottom right of the video.', hi: 'वीडियो में नीचे दाईं तरफ़ चार कोनों वाला निशान दबाइए।' },
      },
      {
        id: 'full',
        screen: 'yt-player',
        full: true,
        kind: 'info',
        say: {
          en: 'Now it fills the screen. Turn your phone sideways to see it even bigger. To come back, tap the same button again.',
          hi: 'अब वीडियो पूरी स्क्रीन पर है। और बड़ा देखना हो, तो फ़ोन को आड़ा कर लीजिए। वापस आने के लिए, वही बटन फिर दबाइए।',
        },
        button: { en: 'Finish', hi: 'पूरा करें' },
      },
    ],
  },

  'swiggy-food': {
    id: 'swiggy-food',
    icon: 'bag',
    app: 'swiggy',
    appName: 'Swiggy',
    emoji: '🍽️',
    minutes: 3,
    title: { en: 'Order food at home with Swiggy', hi: 'Swiggy से घर पर खाना मंगाएं' },
    takeaways: {
      en: [
        'Search the dish, then pick a restaurant',
        "Check 'To pay' in the bill. It includes delivery",
        'Never scan a QR code to get a refund',
      ],
      hi: [
        'पहले खाना ढूंढें, फिर रेस्टोरेंट चुनें',
        "बिल में 'To pay' देखें। उसमें डिलीवरी भी जुड़ी है",
        'रिफ़ंड के लिए कभी QR कोड स्कैन न करें',
      ],
    },
    share: { en: 'I learned to order food on Swiggy with Nook! 🍽️', hi: 'मैंने Nook पर Swiggy से खाना मंगाना सीख लिया! 🍽️' },
    realTry: {
      en: 'Order something small on your real Swiggy, and choose Cash on Delivery if you prefer.',
      hi: 'अपने असली Swiggy से कुछ छोटा मंगाइए, और चाहें तो Cash on Delivery चुनिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll order two idlis from a nearby restaurant on Swiggy, and pay cash when the food arrives. This is only practice. No food will come.",
          hi: 'आज हम Swiggy से पास के रेस्टोरेंट से दो इडली मंगाएंगे, और खाना आने पर नकद देंगे। यह सिर्फ़ अभ्यास है। कोई खाना नहीं आएगा।',
        },
        button: start,
      },
      {
        id: 'search',
        screen: 'sw-home',
        kind: 'tap',
        target: 'search',
        say: { en: 'This is Swiggy. Tap the search box near the top.', hi: 'यह Swiggy है। ऊपर ढूंढने वाला डिब्बा दबाइए।' },
        hint: { en: "Tap the box that says 'Search for dishes'.", hi: "'Search for dishes' लिखा डिब्बा दबाइए।" },
      },
      {
        id: 'suggest',
        screen: 'sw-search',
        kind: 'tap',
        target: 'suggest',
        say: { en: "We've typed 'idli' for you. Tap 'Idli' in the list.", hi: "हमने 'idli' लिख दिया है। लिस्ट में 'Idli' दबाइए।" },
        hint: { en: "Tap the first line, 'Idli'.", hi: "पहली लाइन, 'Idli', दबाइए।" },
      },
      {
        id: 'restaurant',
        screen: 'sw-results',
        kind: 'tap',
        target: 'restaurant',
        say: {
          en: "These restaurants make idli. You can see the rating and how long it takes. Tap 'Sri Krishna Tiffins'.",
          hi: "ये रेस्टोरेंट इडली बनाते हैं। रेटिंग और कितना समय लगेगा, दिख रहा है। 'Sri Krishna Tiffins' दबाइए।",
        },
        hint: { en: 'Tap the first restaurant.', hi: 'पहला रेस्टोरेंट दबाइए।' },
      },
      {
        id: 'add',
        screen: 'sw-menu',
        kind: 'tap',
        target: 'add',
        say: {
          en: "This is the menu. Next to 'Idli, 2 pieces, 60 rupees', tap the green 'ADD' button.",
          hi: "यह मेन्यू है। 'Idli, 2 pieces, 60 रुपये' के आगे हरा 'ADD' बटन दबाइए।",
        },
        hint: { en: "Tap the white 'ADD' button under the idli picture.", hi: "इडली की तस्वीर के नीचे सफ़ेद 'ADD' बटन दबाइए।" },
      },
      {
        id: 'cart',
        screen: 'sw-menu',
        added: true,
        kind: 'tap',
        target: 'cart',
        say: { en: "Added! Now tap the green bar at the bottom, 'View Cart'.", hi: "जुड़ गया! अब नीचे हरी पट्टी, 'View Cart', दबाइए।" },
        hint: { en: 'Tap the green bar at the very bottom.', hi: 'सबसे नीचे हरी पट्टी दबाइए।' },
      },
      {
        id: 'total',
        screen: 'sw-cart',
        kind: 'quiz',
        say: {
          en: 'Look at the bill. The idli is 60 rupees, plus delivery, fees and taxes. How much will you pay in total?',
          hi: 'बिल देखिए। इडली 60 रुपये की है, उसमें डिलीवरी, फ़ीस और टैक्स जुड़ेंगे। कुल कितना देना होगा?',
        },
        options: [
          {
            text: { en: '60 rupees', hi: '60 रुपये' },
            correct: false,
            why: {
              en: "Not quite. Look at 'To pay' at the bottom of the bill: 97 rupees, with delivery and taxes.",
              hi: "पूरा नहीं। बिल में नीचे 'To pay' देखिए: 97 रुपये, डिलीवरी और टैक्स मिलाकर।",
            },
          },
          {
            text: { en: '97 rupees', hi: '97 रुपये' },
            correct: true,
            why: {
              en: "Right! 'To pay' is the total, with delivery and taxes. Keep this much cash ready.",
              hi: "सही! 'To pay' कुल रकम है, डिलीवरी और टैक्स मिलाकर। इतने पैसे तैयार रखिए।",
            },
          },
        ],
      },
      {
        id: 'place',
        screen: 'sw-cart',
        kind: 'tap',
        target: 'place',
        say: {
          en: "Payment says 'Cash on Delivery', so you pay when the food comes. Tap the green 'Place Order' button.",
          hi: "पेमेंट में 'Cash on Delivery' लिखा है, यानी खाना आने पर पैसे देंगे। हरा 'Place Order' बटन दबाइए।",
        },
        hint: { en: "Tap the green 'Place Order' button at the bottom right.", hi: "नीचे दाईं तरफ़ हरा 'Place Order' बटन दबाइए।" },
      },
      {
        id: 'refund-scam',
        screen: 'sw-placed',
        kind: 'quiz',
        say: {
          en: "Order placed! Later someone calls: 'Your order is cancelled. Scan this QR code to get your refund.' What do you do?",
          hi: "ऑर्डर हो गया! थोड़ी देर बाद कोई फ़ोन करता है: 'आपका ऑर्डर कैंसल हो गया। रिफ़ंड के लिए यह QR कोड स्कैन कीजिए।' आप क्या करेंगे?",
        },
        options: [
          {
            text: { en: 'Scan the QR to get my money back', hi: 'पैसे वापस पाने के लिए QR स्कैन करूँ' },
            correct: false,
            why: {
              en: "No! Scanning a QR is for paying, never for getting money. That's a scam. Refunds come back by themselves.",
              hi: 'नहीं! QR स्कैन करके पैसे जाते हैं, आते नहीं। यह धोखा है। रिफ़ंड अपने-आप वापस आता है।',
            },
          },
          {
            text: { en: 'Hang up. Refunds come by themselves', hi: 'फ़ोन काट दूँ। रिफ़ंड अपने-आप आता है' },
            correct: true,
            why: {
              en: 'Well done! A QR code is only for paying. For any problem, use Help inside the app.',
              hi: 'शाबाश! QR कोड सिर्फ़ पैसे देने के लिए है। कोई भी दिक्कत हो, तो ऐप के अंदर Help दबाइए।',
            },
          },
        ],
      },
    ],
  },
};

export const MORE_KEYWORDS = {
  'uber-cab': [
    ['uber', 5], ['उबर', 5], ['cab', 3], ['कैब', 3], ['taxi', 3], ['टैक्सी', 3], ['गाड़ी', 2], ['gaadi', 2],
    ['ride', 2], ['hospital', 1], ['अस्पताल', 1], ['ola', 3], ['ओला', 3],
  ],
  'rapido-auto': [
    ['rapido', 5], ['रैपिडो', 5], ['रापिडो', 5], ['auto', 4], ['ऑटो', 4], ['ओटो', 4], ['bike taxi', 4],
    ['बाइक', 2], ['station', 1], ['स्टेशन', 1],
  ],
  'youtube-play': [
    ['youtube', 5], ['यूट्यूब', 5], ['यूटूब', 5], ['bhajan', 4], ['भजन', 4], ['aarti', 3], ['आरती', 3],
    ['song', 3], ['gaana', 3], ['गाना', 3], ['गाने', 3], ['chalisa', 3], ['चालीसा', 3], ['video dekh', 4],
    ['वीडियो देख', 4], ['watch', 2], ['movie', 2], ['फ़िल्म', 2], ['फिल्म', 2],
  ],
  'swiggy-food': [
    ['swiggy', 5], ['स्विगी', 5], ['zomato', 4], ['ज़ोमैटो', 4], ['जोमैटो', 4], ['food', 3], ['खाना', 3],
    ['khana', 3], ['order', 2], ['ऑर्डर', 2], ['मंगा', 3], ['manga', 3], ['idli', 2], ['इडली', 2], ['restaurant', 3],
  ],
};

export const MORE_REAL = {
  'uber-cab': {
    place: { en: 'Type where you want to go, then tap the right place in the list.', hi: 'जहाँ जाना है, वो लिखिए, फिर लिस्ट में सही जगह दबाइए।' },
    'pick-ride': { en: 'Look at the rides and fares, and tap the one you want.', hi: 'गाड़ियाँ और किराया देखिए, और जो चाहिए उसे दबाइए।' },
    choose: { en: 'Check the payment says Cash (or your choice), then tap the black Choose button.', hi: 'देखिए कि पेमेंट में Cash (या जो आप चाहें) लिखा है, फिर काला Choose बटन दबाइए।' },
    confirm: { en: 'Move the map so the pin is where you are standing, then tap Confirm pickup.', hi: 'नक्शा खिसकाकर निशान वहाँ लाइए जहाँ आप खड़े हैं, फिर Confirm pickup दबाइए।' },
    'check-car': { en: 'Before getting in, match the car number with the app.', hi: 'बैठने से पहले, गाड़ी का नंबर ऐप से मिलाइए।' },
    'ride-pin': { en: 'Tell your PIN only to the driver, after you sit in the right car.', hi: 'PIN सिर्फ़ ड्राइवर को, सही गाड़ी में बैठने के बाद बताइए।' },
    contact: { en: 'Pick a family member to share your trip with.', hi: 'जिस अपने के साथ यात्रा share करनी है, उसे चुनिए।' },
    shared: { en: 'Done. Your family can follow your ride until you reach.', hi: 'हो गया। पहुँचने तक परिवार आपकी यात्रा देख सकता है।' },
  },
  'rapido-auto': {
    place: { en: 'Type where you want to go, then tap the right place.', hi: 'जहाँ जाना है, वो लिखिए, फिर सही जगह दबाइए।' },
    auto: { en: "Tap 'Auto'. The fare is shown next to it.", hi: "'Auto' दबाइए। उसके आगे किराया लिखा होता है।" },
    otp: { en: 'Check the auto number, then tell the OTP to the captain in person.', hi: 'ऑटो का नंबर मिलाइए, फिर captain को सामने OTP बताइए।' },
    fare: { en: 'At the end, pay exactly the fare the app shows.', hi: 'आख़िर में, ठीक उतना किराया दीजिए जितना ऐप में दिखे।' },
  },
  'youtube-play': {
    suggest: { en: 'Type what you want to watch, or tap the mic and say it. Then tap a suggestion.', hi: 'जो देखना है, लिखिए, या माइक दबाकर बोलिए। फिर कोई सुझाव दबाइए।' },
    video: { en: 'Tap the video you want to play.', hi: 'जो वीडियो चलाना है, उसे दबाइए।' },
    ad: { en: "If an ad plays, wait for 'Skip'. Never tap 'Install' on an ad.", hi: "विज्ञापन चले, तो 'Skip' का इंतज़ार कीजिए। विज्ञापन पर 'Install' कभी मत दबाइए।" },
    skip: { en: "Tap 'Skip' when it appears at the bottom right.", hi: "नीचे दाईं तरफ़ 'Skip' आए, तो दबाइए।" },
  },
  'swiggy-food': {
    suggest: { en: 'Type the dish you want, then tap it in the list.', hi: 'जो खाना चाहिए, लिखिए, फिर लिस्ट में दबाइए।' },
    restaurant: { en: 'Pick a restaurant. Look at its rating and time.', hi: 'कोई रेस्टोरेंट चुनिए। उसकी रेटिंग और समय देखिए।' },
    add: { en: "Tap 'ADD' next to what you want.", hi: "जो चाहिए, उसके आगे 'ADD' दबाइए।" },
    total: { en: "Check 'To pay' in the bill. That is the full amount.", hi: "बिल में 'To pay' देखिए। वही पूरी रकम है।" },
    place: { en: "Choose how to pay, then tap 'Place Order'.", hi: "पेमेंट का तरीका चुनिए, फिर 'Place Order' दबाइए।" },
  },
};
