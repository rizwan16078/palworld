export const PAL_IMAGE_BY_ID: Record<string, string> = {
  lamball: "/pal/T_SheepBall_icon_normal.png",
  cattiva: "/pal/T_NaughtyCat_icon_normal.png",
  chikipi: "/pal/T_ChickenPal_icon_normal.png",
  lifmunk: "/pal/T_LeafMomonga_icon_normal.png",
  foxparks: "/pal/T_Kitsunebi_icon_normal.png",
  sparkit: "/pal/T_ElecCat_icon_normal.png",
  pengullet: "/pal/T_Penguin_icon_normal.png",
  fuack: "/pal/T_BluePlatypus_icon_normal.png",
  tanzee: "/pal/T_Monkey_icon_normal.png",
  beegarde: "/pal/T_SoldierBee_icon_normal.png",
  rooby: "/pal/T_FlameBambi_icon_normal.png",
  verdash: "/pal/T_GrassRabbitMan_icon_normal.png",
  daedream: "/pal/T_DreamDemon_icon_normal.png",
  arsox: "/pal/T_FlameBuffalo_icon_normal.png",
  vanwyrm: "/pal/T_HadesBird_icon_normal.png",
  penking: "/pal/T_CaptainPenguin_icon_normal.png",
  mossanda: "/pal/T_GrassPanda_icon_normal.png",
  ragnahawk: "/pal/T_RedArmorBird_icon_normal.png",
  jormuntide: "/pal/T_Umihebi_icon_normal.png",
  relaxaurus: "/pal/T_LazyDragon_icon_normal.png",
  grizzbolt: "/pal/T_ElecPanda_icon_normal.png",
  frostallion: "/pal/T_IceHorse_icon_normal.png",
  anubis: "/pal/T_Anubis_icon_normal.png",
  suzaku: "/pal/T_Suzaku_icon_normal.png",
  jetragon: "/pal/T_JetDragon_icon_normal.png",
};

export function getPalImageSrc(palId: string): string | null {
  return PAL_IMAGE_BY_ID[palId] ?? null;
}
