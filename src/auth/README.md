# Directory is function check auth

-AuthProvider เป็นไฟล์ดึงข้อมูล user กับ token จาก cookie ในกรณีที่มี ถ้าไม่มี ให้ logout ออกเมื่อ checkAuth เป็น true
-AuthGuard เป็นไฟล์ check auth ถ้าไม่มี token จะ redirect ไปหน้า login
-GuestGuard เป็นไฟล์ไม่เช็ค Auth ถ้ามี token จะเข้าไม่ได้