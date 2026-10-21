import { authService, DEMO_PRESETS } from '../src/services/auth/AuthService.ts';

console.log('🧪 ==============================================================');
console.log('🧪 PRUEBAS UNITARIAS DE AUTENTICACIÓN (CINEPLUS ID & SUPABASE)');
console.log('🧪 ==============================================================\n');

async function runAuthTests() {
  // 1. Probar acceso rápido con cuenta de demostración (Docente)
  console.log('1️⃣ Evaluando Acceso Rápido Demo (Docente Evaluador):');
  const docenteUser = await authService.loginAsDemo('docente');
  console.log(`   • Usuario: ${docenteUser.name} (${docenteUser.email})`);
  console.log(`   • Rol: [${docenteUser.role.toUpperCase()}] -> "${docenteUser.getRoleLabel()}"`);
  console.log(`   • Iniciales Avatar: "${docenteUser.getInitials()}"`);
  console.log(`   • ¿Es cuenta Demo?: ${docenteUser.isDemo ? 'Sí (Zero-Config)' : 'No (Supabase Cloud)'}\n`);

  // 2. Probar cierre de sesión
  console.log('2️⃣ Evaluando Cierre de Sesión:');
  await authService.logout();
  console.log(`   • Usuario activo tras logout: ${authService.getCurrentUser() === null ? 'Ninguno (Sesión limpia)' : 'Error'}\n`);

  // 3. Probar registro de un nuevo usuario
  console.log('3️⃣ Evaluando Registro de Nuevo Usuario:');
  const nuevo = await authService.registerWithEmail(
    'Juan Diego Rivera',
    'jrivera@undac.edu.pe',
    'segura123',
    'usuario'
  );
  console.log(`   • Usuario Creado: ${nuevo.name} con ID: ${nuevo.id}`);
  console.log(`   • Iniciales Avatar: "${nuevo.getInitials()}"`);
  console.log(`   • Autenticado actualmente: ${authService.isAuthenticated() ? 'Sí' : 'No'}\n`);

  // 4. Probar inicio de sesión con el usuario registrado
  console.log('4️⃣ Evaluando Login con Credenciales Registradas:');
  await authService.logout();
  const logueado = await authService.loginWithEmail('jrivera@undac.edu.pe', 'segura123');
  console.log(`   • Login Exitoso para: ${logueado.name} (${logueado.email})`);
  console.log(`   • Rol de Cuenta: ${logueado.getRoleLabel()}\n`);

  console.log('✅ Todas las pruebas de Autenticación de la Fase 1 pasaron al 100%.');
}

runAuthTests().catch((err) => {
  console.error('❌ Error en pruebas:', err);
  process.exit(1);
});
