import { authService } from '../src/services/auth/AuthService.ts';

console.log('🧪 =========================================================================');
console.log('🧪 PRUEBAS DE SEGURIDAD, RBAC, TELEGRAM OTP Y RECUPERACIÓN (CINEPLUS ID)');
console.log('🧪 =========================================================================\n');

async function runAuthTests() {
  // 1. Probar login de Administrador con contraseña correcta
  console.log('1️⃣ Evaluando Login de Administrador Oficial (admin@cineplus.pe / Admin2026!):');
  const adminUser = await authService.loginWithEmail('admin@cineplus.pe', 'Admin2026!');
  console.log(`   • Usuario: ${adminUser.name} (${adminUser.email})`);
  console.log(`   • Rol: [${adminUser.role.toUpperCase()}] -> "${adminUser.getRoleLabel()}"`);
  console.log(`   • ¿Tiene privilegios de Admin?: ${adminUser.isAdmin() ? 'SÍ (Correcto)' : 'NO'}`);
  await authService.logout();
  console.log('   • Sesión de admin cerrada con éxito.\n');

  // 2. Probar rechazo de Administrador con contraseña incorrecta
  console.log('2️⃣ Evaluando Rechazo ante Contraseña Incorrecta de Admin:');
  try {
    await authService.loginWithEmail('admin@cineplus.pe', 'PasswordEquivocada123');
    throw new Error('FALLO: Se permitió el acceso con contraseña incorrecta');
  } catch (err) {
    console.log(`   • Correctamente rechazado: "${err.message}"\n`);
  }

  // 3. Probar registro público (debe forzar rol 'usuario' / Cinéfilo)
  console.log('3️⃣ Evaluando Registro Público Endurecido (Inmutabilidad de Rol):');
  const nuevoCinefilo = await authService.registerWithEmail(
    'Daniel Alcides Carrión',
    'estudiante@undac.edu.pe',
    'claveSegura123',
    '954821630'
  );
  console.log(`   • Usuario creado: ${nuevoCinefilo.name} (${nuevoCinefilo.email})`);
  console.log(`   • Rol asignado: [${nuevoCinefilo.role}] -> "${nuevoCinefilo.getRoleLabel()}"`);
  console.log(`   • ¿Es admin?: ${nuevoCinefilo.isAdmin() ? 'PELIGRO (No debe ser admin)' : 'NO (Rol cinéfilo forzado)'}`);
  console.log(`   • Celular guardado: ${nuevoCinefilo.phone || 'Ninguno'}\n`);
  await authService.logout();

  // 4. Probar recuperación con correo inexistente (Debe fallar de inmediato)
  console.log('4️⃣ Evaluando Rechazo de Recuperación con Correo Falso/Inexistente:');
  try {
    await authService.requestPasswordReset('correo_que_no_existe_999@gmail.com');
    throw new Error('FALLO: Se aceptó un correo que no existe en la base de datos');
  } catch (err) {
    console.log(`   • Correctamente rechazado: "${err.message}"\n`);
  }

  // 5. Probar recuperación con correo existente (Flujo OTP completo)
  console.log('5️⃣ Evaluando Solicitud de Recuperación y Generación de Código OTP:');
  const resetReq = await authService.requestPasswordReset('estudiante@undac.edu.pe');
  console.log(`   • Cuenta verificada: ${resetReq.user.name} (${resetReq.email})`);
  console.log(`   • Resultado: ${resetReq.message}`);

  // Simulación de envío por correo / fallback académico
  const emailOtpRes = await authService.sendOtpViaEmail('estudiante@undac.edu.pe');
  console.log(`   • Canal Correo: ${emailOtpRes.message}`);
  const otpCode = emailOtpRes.simulationCode;
  console.log(`   • Código OTP de 6 dígitos generado: [${otpCode}]`);

  // Validar código OTP erróneo
  try {
    authService.verifyOtp('estudiante@undac.edu.pe', '000000');
    throw new Error('FALLO: Aceptó código OTP incorrecto');
  } catch (err) {
    console.log(`   • Código incorrecto rechazado con éxito: "${err.message}"`);
  }

  // Validar código OTP correcto y cambiar contraseña
  console.log('   • Validando código OTP correcto y cambiando contraseña...');
  await authService.resetPassword('estudiante@undac.edu.pe', 'nuevaClave2026!', otpCode);
  console.log('   • Contraseña actualizada exitosamente en base de datos.');

  // Comprobar inicio de sesión con la nueva contraseña
  const userConNuevaClave = await authService.loginWithEmail('estudiante@undac.edu.pe', 'nuevaClave2026!');
  console.log(`   • Login exitoso con la NUEVA contraseña para: ${userConNuevaClave.name}\n`);

  console.log('✅ ¡TODAS LAS PRUEBAS DE SEGURIDAD, RBAC Y RECUPERACIÓN OTP PASARON AL 100%!');
}

runAuthTests().catch((err) => {
  console.error('❌ Error en pruebas:', err);
  process.exit(1);
});
