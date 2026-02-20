const starCount = 200; // عدد النجوم
  const shootingCount = 10; // عدد الشهب

  // إضافة نجوم
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 3 + 1; // حجم النجمة
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.opacity = Math.random();
    document.body.appendChild(star);
  }

  // إضافة شهب
  for (let i = 0; i < shootingCount; i++) {
    const shooting = document.createElement('div');
    shooting.classList.add('shooting-star');
    shooting.style.top = `${Math.random() * window.innerHeight / 2}px`;
    shooting.style.left = `${Math.random() * window.innerWidth}px`;
    shooting.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(shooting);
  }


  (function(){
    // عناصر الواجهة
    const intro = document.getElementById('intro');
    const nameText = document.getElementById('nameText');
    const roleText = document.getElementById('roleText');
    const main = document.getElementById('main');

    // إعدادات التوقيت (يمكن تغيرها)
    const timings = {
      nameShow: 100,     // ms بعد تحميل الصفحة نبدأ نظهر الاسم
      nameVisible: 900,  // مدة ظهور الاسم قبل اختفائه
      between: 300,      // فترة بين اختفاء الاسم وظهور الدور
      roleVisible: 900,  // مدة ظهور الـ role
      finalDelay: 300    // تأخير قبل إظهار المحتوى كله
    };

    // helper لعمل delay
    const wait = ms => new Promise(res => setTimeout(res, ms));

    async function runSequence(){
      // تأكد إن العناصر مخفية بالبداية (CSS already)
      // 1) نعرض الاسم
      await wait(timings.nameShow);
      nameText.classList.add('visible');

      // 2) بعد وقت الاسم، نخفي الاسم
      await wait(timings.nameVisible);
      nameText.classList.remove('visible');
      nameText.classList.add('hide');

      // 3) gap بسيط
      await wait(timings.between);
      nameText.classList.remove('hide');

      // 4) نعرض الدور (Front-End Developer)
      roleText.classList.add('visible');

      // 5) بعد وقت الدور، نخفيه
      await wait(timings.roleVisible);
      roleText.classList.remove('visible');
      roleText.classList.add('hide');

      // 6) نعمل delay بسيط وبعدين نخفّي الـ intro overlay ونظهر المحتوى
      await wait(timings.finalDelay);

      // smooth hide للغلاف: نقدر نعمل transition بإضافة class أو مباشرة ازالته
      intro.style.pointerEvents = 'none';
      intro.style.transition = 'opacity 400ms ease';
      intro.style.opacity = '0';

      // بعد انتهى الفيد-اوت نخفى العنصر نهائيًا عشان الـ z-index يروح
      await wait(420);
      intro.remove();

      // أظهر المحتوى الرئيسي
      main.classList.add('visible');

      // بعد ما الصفحة ظهرت ممكن تخلّي overflow auto لو عايز سكرول:
      document.body.style.overflow = ''; // يرجّع افتراضي لو محتاج
    }

    // شغّل السلسلة فورًا (لماذا؟ لأن الكود داخل IIFE ويعمل أثناء تحميل الـ DOM)
    // لو عايز تأكد الـ DOM جاهز استخدم DOMContentLoaded لكن هنا بنطلق فورًا
    runSequence();

  })();