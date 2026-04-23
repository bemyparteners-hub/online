/**
 * PLIALU — Données métier
 * Source : Liste_des_Articles_Configurateurs_.xlsx
 * 275 articles / 15 familles
 * Mise à jour : 2026-04-22
 */

const PLIALU_FAMILLES = [
  "Bavette",
  "Bavette Accessoire",
  "Couvertine",
  "Couvertine Accessoire",
  "Couvre Joint",
  "Departs",
  "Divers",
  "GeExtrude",
  "Habillage",
  "Lateraux",
  "Lisses",
  "Profils Divers",
  "Solin et Ge Pliées",
  "Solins et Ge Pliées Accessoires",
  "Test"
];

const PLIALU_ARTICLES = [
  // ── Bavette ──────────────────────────────────────────────────────────────
  { id: 1,   famille: "Bavette", article: "Bv2Biaise" },
  { id: 2,   famille: "Bavette", article: "Bv2Plis" },
  { id: 3,   famille: "Bavette", article: "Bv2Plis-90deg" },
  { id: 4,   famille: "Bavette", article: "Bv3Plis" },
  { id: 5,   famille: "Bavette", article: "Bv3Plis-90deg" },
  { id: 6,   famille: "Bavette", article: "Bv3PlisBiaise" },
  { id: 7,   famille: "Bavette", article: "Bv4Plis" },
  { id: 8,   famille: "Bavette", article: "Bv4Plis-90deg" },
  { id: 9,   famille: "Bavette", article: "Bv4PlisBiaise" },
  { id: 10,  famille: "Bavette", article: "Bv4PlisPerfos" },
  { id: 11,  famille: "Bavette", article: "Bavette 2 Plis Encoche Droite Generique" },
  { id: 12,  famille: "Bavette", article: "Bavette 2 Plis Encoche Gauche Generique" },
  { id: 13,  famille: "Bavette", article: "Bavette 2 Plis Encoche Generique" },
  { id: 14,  famille: "Bavette", article: "Bavette 2 Plis Generique" },
  { id: 15,  famille: "Bavette", article: "Bavette 2 Plis Rayonne" },
  { id: 16,  famille: "Bavette", article: "Bavette 3 Plis Encoche Droite Generique" },
  { id: 17,  famille: "Bavette", article: "Bavette 3 Plis Encoche Gauche Generique" },
  { id: 18,  famille: "Bavette", article: "Bavette 3 Plis Encoche Generique" },
  { id: 19,  famille: "Bavette", article: "Bavette 3 Plis Encoche" },
  { id: 20,  famille: "Bavette", article: "Bavette 3 Plis Encoches et Relevées" },
  { id: 21,  famille: "Bavette", article: "Bavette 3 Plis Generique" },
  { id: 22,  famille: "Bavette", article: "Bavette 3 Plis Rayonne" },
  { id: 23,  famille: "Bavette", article: "Bavette 3 Plis Releve Droite" },
  { id: 24,  famille: "Bavette", article: "Bavette 3 Plis Releve Gauche" },
  { id: 25,  famille: "Bavette", article: "Bavette 3 Plis Releves" },
  { id: 26,  famille: "Bavette", article: "Bavette 4 Plis Encoche Droite Generique" },
  { id: 27,  famille: "Bavette", article: "Bavette 4 Plis Encoche Gauche Generique" },
  { id: 28,  famille: "Bavette", article: "Bavette 4 Plis Encoche Generique" },
  { id: 29,  famille: "Bavette", article: "Bavette 4 Plis Generique" },
  { id: 30,  famille: "Bavette", article: "Bavette 4 Plis Rayonne" },
  { id: 31,  famille: "Bavette", article: "Bavette Pente 2 Plis Rabat à droite" },
  { id: 32,  famille: "Bavette", article: "Bavette Pente 2 Plis Rabat à Gauche" },
  { id: 33,  famille: "Bavette", article: "Bavette Pente 2 Plis Rabat+Ge à droite" },
  { id: 34,  famille: "Bavette", article: "Bavette Pente 2 Plis Rabat+Ge à gauche" },
  { id: 35,  famille: "Bavette", article: "Bavette Pente 2 Plis Rabats+Ge" },
  { id: 36,  famille: "Bavette", article: "Bavette Pente 3 Plis Rabat à droite" },
  { id: 37,  famille: "Bavette", article: "Bavette Pente 3 Plis Rabat à Gauche" },
  { id: 38,  famille: "Bavette", article: "Bavette Pente 3 Plis Rabat+Ge à droite" },
  { id: 39,  famille: "Bavette", article: "Bavette Pente 3 Plis Rabat+Ge à gauche" },
  { id: 40,  famille: "Bavette", article: "Bavette Pente 3 Plis Rabats+Ge" },
  { id: 41,  famille: "Bavette", article: "Bavette Pente 4 Plis Rabat à droite" },
  { id: 42,  famille: "Bavette", article: "Bavette Pente 4 Plis Rabat à Gauche" },
  { id: 43,  famille: "Bavette", article: "Bavette Pente 4 Plis Rabat+Ge à droite" },
  { id: 44,  famille: "Bavette", article: "Bavette Pente 4 Plis Rabat+Ge à gauche" },
  { id: 45,  famille: "Bavette", article: "Bavette Pente 4 Plis Rabats+Ge" },
  { id: 46,  famille: "Bavette", article: "Bavette Plate 2 Plis Rabat à droite" },
  { id: 47,  famille: "Bavette", article: "Bavette Plate 2 Plis Rabat à Gauche" },
  { id: 48,  famille: "Bavette", article: "Bavette Plate 2 Plis RabatGe à droite" },
  { id: 49,  famille: "Bavette", article: "Bavette Plate 2 Plis RabatGe à gauche" },
  { id: 50,  famille: "Bavette", article: "Bavette Plate 3 Plis Rabat à droite" },
  { id: 51,  famille: "Bavette", article: "Bavette Plate 3 Plis Rabat à Gauche" },
  { id: 52,  famille: "Bavette", article: "Bavette Plate 3 Plis RabatGe à droite" },
  { id: 53,  famille: "Bavette", article: "Bavette Plate 3 Plis RabatGe à gauche" },
  { id: 54,  famille: "Bavette", article: "Bavette Plate 4 Plis Rabat à droite" },
  { id: 55,  famille: "Bavette", article: "Bavette Plate 4 Plis Rabat à Gauche" },
  { id: 56,  famille: "Bavette", article: "Bavette Plate 4 Plis RabatGe à droite" },
  { id: 57,  famille: "Bavette", article: "Bavette Plate 4 Plis RabatGe à gauche" },
  { id: 58,  famille: "Bavette", article: "Bavettes Generique" },
  { id: 59,  famille: "Bavette", article: "Bv 4 Plis Plate" },
  { id: 60,  famille: "Bavette", article: "Bv Pente 2 Plis Ge Ecrasée" },
  { id: 61,  famille: "Bavette", article: "Bv Pente 3 Plis Ge Ecrasée" },
  { id: 62,  famille: "Bavette", article: "Bv Pente 4 Plis Ge Ecrasée" },
  { id: 63,  famille: "Bavette", article: "Bv Plate 2 Plis Ge Ecrasée" },
  { id: 64,  famille: "Bavette", article: "Bv Plate 3 Plis Ge Ecrasée" },
  { id: 65,  famille: "Bavette", article: "Bv Plate 4 Plis Ge Ecrasée" },
  { id: 66,  famille: "Bavette", article: "Epingle" },
  { id: 67,  famille: "Bavette", article: "Habillage Generique" },
  { id: 68,  famille: "Bavette", article: "Habillage Perfos 1 Rangee" },
  { id: 69,  famille: "Bavette", article: "Habillage Perfos 2 Rangees" },
  { id: 70,  famille: "Bavette", article: "Habillage Perfos 3 Rangees" },
  { id: 71,  famille: "Bavette", article: "Tableau" },

  // ── Bavette Accessoire ───────────────────────────────────────────────────
  { id: 72,  famille: "Bavette Accessoire", article: "AnglePenteRentrantBv2" },
  { id: 73,  famille: "Bavette Accessoire", article: "AnglePenteRentrantBv3" },
  { id: 74,  famille: "Bavette Accessoire", article: "AnglePenteRentrantBv4" },
  { id: 75,  famille: "Bavette Accessoire", article: "AnglePenteSortantBv2" },
  { id: 76,  famille: "Bavette Accessoire", article: "AnglePenteSortantBv3" },
  { id: 77,  famille: "Bavette Accessoire", article: "AnglePenteSortantBv4" },
  { id: 78,  famille: "Bavette Accessoire", article: "AnglePlatRentrantBv2" },
  { id: 79,  famille: "Bavette Accessoire", article: "AnglePlatRentrantBv3" },
  { id: 80,  famille: "Bavette Accessoire", article: "AnglePlatRentrantBv4" },
  { id: 81,  famille: "Bavette Accessoire", article: "AnglePlatSortantBv2" },
  { id: 82,  famille: "Bavette Accessoire", article: "AnglePlatSortantBv3" },
  { id: 83,  famille: "Bavette Accessoire", article: "AnglePlatSortantBv4" },
  { id: 84,  famille: "Bavette Accessoire", article: "BouchBvPente-D" },
  { id: 85,  famille: "Bavette Accessoire", article: "BouchBvPente-G" },
  { id: 86,  famille: "Bavette Accessoire", article: "BouchBvPlate-D" },
  { id: 87,  famille: "Bavette Accessoire", article: "BouchBvPlate-G" },
  { id: 88,  famille: "Bavette Accessoire", article: "EqAC Ext A Coller" },
  { id: 89,  famille: "Bavette Accessoire", article: "EqAC Int A Coller" },
  { id: 90,  famille: "Bavette Accessoire", article: "Equerre de Finition Laquage Ext" },
  { id: 91,  famille: "Bavette Accessoire", article: "Equerre de Finition Laquage Int" },
  { id: 92,  famille: "Bavette Accessoire", article: "Releve 1 Pli Droite" },
  { id: 93,  famille: "Bavette Accessoire", article: "Releve 1 Pli Gauche" },
  { id: 94,  famille: "Bavette Accessoire", article: "Releve 1 Pli" },
  { id: 95,  famille: "Bavette Accessoire", article: "Releve 2 Plis Droite" },
  { id: 96,  famille: "Bavette Accessoire", article: "Releve 2 Plis Gauche" },
  { id: 97,  famille: "Bavette Accessoire", article: "Releve 2 Plis" },
  { id: 98,  famille: "Bavette Accessoire", article: "Releve Type1 Bavette Rayonnée Droite" },
  { id: 99,  famille: "Bavette Accessoire", article: "Releve Type1 Bavette Rayonnée Gauche" },
  { id: 100, famille: "Bavette Accessoire", article: "Releve Type2 Bavette Rayonnée Droite" },
  { id: 101, famille: "Bavette Accessoire", article: "Releve Type2 Bavette Rayonnée Gauche" },
  { id: 102, famille: "Bavette Accessoire", article: "Support Bavette Pentée 1 Pli" },
  { id: 103, famille: "Bavette Accessoire", article: "Support Bavette Pentée 2 Plis" },
  { id: 104, famille: "Bavette Accessoire", article: "Support Bavette Plate 1 Pli" },
  { id: 105, famille: "Bavette Accessoire", article: "Support Bavette Plate 2 Plis" },
  { id: 106, famille: "Bavette Accessoire", article: "EclExtBv2" },
  { id: 107, famille: "Bavette Accessoire", article: "EclExtBv2Ray" },
  { id: 108, famille: "Bavette Accessoire", article: "EclExtBv3" },
  { id: 109, famille: "Bavette Accessoire", article: "EclExtBv3Plate" },
  { id: 110, famille: "Bavette Accessoire", article: "EclExtBv3Ray" },
  { id: 111, famille: "Bavette Accessoire", article: "EclExtBv4" },
  { id: 112, famille: "Bavette Accessoire", article: "EclExtBv4Plate" },
  { id: 113, famille: "Bavette Accessoire", article: "EclExtBv4Ray" },
  { id: 114, famille: "Bavette Accessoire", article: "EclIntBv2" },
  { id: 115, famille: "Bavette Accessoire", article: "EclIntBv3et4" },

  // ── Couvertine ───────────────────────────────────────────────────────────
  { id: 116, famille: "Couvertine", article: "Couvertine Pente Clipse" },
  { id: 117, famille: "Couvertine", article: "Couvertine Pente Collee" },
  { id: 118, famille: "Couvertine", article: "Couvertine Pente Ge Ecrasé" },
  { id: 119, famille: "Couvertine", article: "Couvertine Plate 1 Rabat Ge" },
  { id: 120, famille: "Couvertine", article: "Couvertine Plate 1 Rabat" },
  { id: 121, famille: "Couvertine", article: "Couvertine Plate 2 Rabats Ge" },
  { id: 122, famille: "Couvertine", article: "Couvertine Plate 2 Rabats" },
  { id: 123, famille: "Couvertine", article: "Couvertine Plate Clipse" },
  { id: 124, famille: "Couvertine", article: "Couvertine Plate Collee Ge Ecrasé" },
  { id: 125, famille: "Couvertine", article: "Couvertine Plate Collee" },
  { id: 126, famille: "Couvertine", article: "Couvertine Plate Descendante" },
  { id: 127, famille: "Couvertine", article: "Couvertine Plate Montante" },
  { id: 128, famille: "Couvertine", article: "Couvertines" },

  // ── Couvertine Accessoire ────────────────────────────────────────────────
  { id: 129, famille: "Couvertine Accessoire", article: "Angle Couvertine Plate Collee Ouverture Variable" },
  { id: 130, famille: "Couvertine Accessoire", article: "Angle Couvertine Plate Collee" },
  { id: 131, famille: "Couvertine Accessoire", article: "Angle Rentrant Couvertine Clipse Ouverture Variable" },
  { id: 132, famille: "Couvertine Accessoire", article: "Angle Rentrant Couvertine Clipse" },
  { id: 133, famille: "Couvertine Accessoire", article: "Angle Rentrant Couvertine Collee" },
  { id: 134, famille: "Couvertine Accessoire", article: "Angle Rentrant Couvertine Plate Clipse" },
  { id: 135, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Clipse Ouverture Variable" },
  { id: 136, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Clipse" },
  { id: 137, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Collee" },
  { id: 138, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Plate Clipse Ouverture Variable" },
  { id: 139, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Plate Clipse" },
  { id: 140, famille: "Couvertine Accessoire", article: "Angle Sortant Couvertine Plate" },
  { id: 141, famille: "Couvertine Accessoire", article: "Angle T couvertine Pente Clipse" },
  { id: 142, famille: "Couvertine Accessoire", article: "Angle T couvertine Pente Collee" },
  { id: 143, famille: "Couvertine Accessoire", article: "Angle T Couvertine Plate Clipse" },
  { id: 144, famille: "Couvertine Accessoire", article: "Angle T Couvertine Plate Collee" },
  { id: 145, famille: "Couvertine Accessoire", article: "BouchCouvPente-D" },
  { id: 146, famille: "Couvertine Accessoire", article: "BouchCouvPente-D-Ge" },
  { id: 147, famille: "Couvertine Accessoire", article: "BouchCouvPente-G" },
  { id: 148, famille: "Couvertine Accessoire", article: "BouchCouvPente-G-Ge" },
  { id: 149, famille: "Couvertine Accessoire", article: "Bouchon Couvertine Plate Ge" },
  { id: 150, famille: "Couvertine Accessoire", article: "Bouchon Couvertine Plate" },
  { id: 151, famille: "Couvertine Accessoire", article: "EclExt Couvertine Pente Clipse" },
  { id: 152, famille: "Couvertine Accessoire", article: "EclExt Couvertine Pente Collee" },
  { id: 153, famille: "Couvertine Accessoire", article: "EclExt Couvertine Plate Clipse" },
  { id: 154, famille: "Couvertine Accessoire", article: "EclExt Couvertine Plate Collee" },
  { id: 155, famille: "Couvertine Accessoire", article: "EclInt Couvertine Pente Clipse" },
  { id: 156, famille: "Couvertine Accessoire", article: "EclInt Couvertine Pente Collee" },
  { id: 157, famille: "Couvertine Accessoire", article: "EclInt Couvertine Plate Clipse" },
  { id: 158, famille: "Couvertine Accessoire", article: "EclInt Couvertine Plate Collee" },
  { id: 159, famille: "Couvertine Accessoire", article: "EqAC Ext A Coller" },
  { id: 160, famille: "Couvertine Accessoire", article: "EqAC Int A Coller" },
  { id: 161, famille: "Couvertine Accessoire", article: "Releve Couvertine" },
  { id: 162, famille: "Couvertine Accessoire", article: "Rustine à Coller" },
  { id: 163, famille: "Couvertine Accessoire", article: "Support Nervure Couvertine Création de Pente" },
  { id: 164, famille: "Couvertine Accessoire", article: "Support Nervure Couvertine pente" },
  { id: 165, famille: "Couvertine Accessoire", article: "Support Nervure Couvertine penteRetombVerticales" },
  { id: 166, famille: "Couvertine Accessoire", article: "Support Nervure Couvertine plate" },
  { id: 167, famille: "Couvertine Accessoire", article: "Support Nervure Couvertine plateRetombVerticales" },

  // ── Couvre Joint ─────────────────────────────────────────────────────────
  { id: 168, famille: "Couvre Joint", article: "BouchPente-D" },
  { id: 169, famille: "Couvre Joint", article: "BouchPlat-D" },
  { id: 170, famille: "Couvre Joint", article: "BouchPlat-G" },
  { id: 171, famille: "Couvre Joint", article: "Couvre joint Angle Ext Perfos" },
  { id: 172, famille: "Couvre Joint", article: "Couvre joint Angle Ext" },
  { id: 173, famille: "Couvre Joint", article: "Couvre joint Angle Int Perfos" },
  { id: 174, famille: "Couvre Joint", article: "Couvre joint Angle Int" },
  { id: 175, famille: "Couvre Joint", article: "Couvre joint Angle Z" },
  { id: 176, famille: "Couvre Joint", article: "Couvre joint Angle Z-Perfos" },
  { id: 177, famille: "Couvre Joint", article: "Couvre joint Angle Z-PerfosHaute" },
  { id: 178, famille: "Couvre Joint", article: "Couvre Joint Plat Perfos" },
  { id: 179, famille: "Couvre Joint", article: "Couvre joint Plat" },
  { id: 180, famille: "Couvre Joint", article: "Omega Laque Ext" },
  { id: 181, famille: "Couvre Joint", article: "Omega Laque Int" },
  { id: 182, famille: "Couvre Joint", article: "Omega" },
  { id: 183, famille: "Couvre Joint", article: "Releve 1 Pli" },
  { id: 184, famille: "Couvre Joint", article: "Releve 2 Plis" },
  { id: 185, famille: "Couvre Joint", article: "Couvre Joint General" },

  // ── Departs ──────────────────────────────────────────────────────────────
  { id: 186, famille: "Departs", article: "Depart Type 1" },
  { id: 187, famille: "Departs", article: "Depart Type OSP" },
  { id: 188, famille: "Departs", article: "Depart" },

  // ── Divers ───────────────────────────────────────────────────────────────
  { id: 189, famille: "Divers", article: "Angle Corn Ext" },
  { id: 190, famille: "Divers", article: "A Débit" },
  { id: 191, famille: "Divers", article: "Angle" },
  { id: 192, famille: "Divers", article: "Corn 1 Pli Ecrase Exterieur Ferme" },
  { id: 193, famille: "Divers", article: "Corn 1 Pli Ecrase Exterieur Ouvert" },
  { id: 194, famille: "Divers", article: "Corn 1 Pli Ecrase Interieur Ferme" },
  { id: 195, famille: "Divers", article: "Corn 1 Pli Ecrase Interieur Ouvert" },
  { id: 196, famille: "Divers", article: "Corn 1 Pli Ecrase" },
  { id: 197, famille: "Divers", article: "Corn 1 Pli Exterieur Ecrase" },
  { id: 198, famille: "Divers", article: "Corn 2 Plis Ecrases Exterieur Ferme" },
  { id: 199, famille: "Divers", article: "Corn 2 Plis Ecrases Exterieur Ouvert" },
  { id: 200, famille: "Divers", article: "Corn 2 Plis Ecrases Interieur Ferme" },
  { id: 201, famille: "Divers", article: "Corn 2 Plis Ecrases Interieur Ouvert" },
  { id: 202, famille: "Divers", article: "Corn 2 Plis Ecrases Interieur" },
  { id: 203, famille: "Divers", article: "Corn 2 Plis Ecrases" },
  { id: 204, famille: "Divers", article: "Corn 2 Plis Laquage Ext" },
  { id: 205, famille: "Divers", article: "Corn 2 Plis Laquage Int" },
  { id: 206, famille: "Divers", article: "Corn Brut Fermee" },
  { id: 207, famille: "Divers", article: "Corn Brut Ouverte" },
  { id: 208, famille: "Divers", article: "Corn Brut" },
  { id: 209, famille: "Divers", article: "Corn Ep" },
  { id: 210, famille: "Divers", article: "Corn Ext Fermee" },
  { id: 211, famille: "Divers", article: "Corn Ext Ouverte" },
  { id: 212, famille: "Divers", article: "Corn Ext" },
  { id: 213, famille: "Divers", article: "Corn Int Fermee" },
  { id: 214, famille: "Divers", article: "Corn Int Ouverte" },
  { id: 215, famille: "Divers", article: "Corn Int" },
  { id: 216, famille: "Divers", article: "Corn R5T7" },
  { id: 217, famille: "Divers", article: "Divers" },
  { id: 218, famille: "Divers", article: "Epingle" },
  { id: 219, famille: "Divers", article: "Omega Brut" },
  { id: 220, famille: "Divers", article: "Omega Laque Ext" },
  { id: 221, famille: "Divers", article: "Omega Laque Int" },
  { id: 222, famille: "Divers", article: "Plat" },
  { id: 223, famille: "Divers", article: "U Brut cote Int" },
  { id: 224, famille: "Divers", article: "U Brut" },
  { id: 225, famille: "Divers", article: "U Ext cote Int" },
  { id: 226, famille: "Divers", article: "U Ext" },
  { id: 227, famille: "Divers", article: "U Int cote Int" },
  { id: 228, famille: "Divers", article: "U Int" },
  { id: 229, famille: "Divers", article: "Z Brut" },
  { id: 230, famille: "Divers", article: "Z Ext" },
  { id: 231, famille: "Divers", article: "Z Int" },
  { id: 232, famille: "Divers", article: "Tube" },

  // ── GeExtrude ────────────────────────────────────────────────────────────
  { id: 233, famille: "GeExtrude", article: "AngleRentrantGeExtrude" },
  { id: 234, famille: "GeExtrude", article: "AngleSortantGeExtrude" },
  { id: 235, famille: "GeExtrude", article: "Bouchon Ge Droite" },
  { id: 236, famille: "GeExtrude", article: "Bouchon Ge Gauche" },
  { id: 237, famille: "GeExtrude", article: "CJEXTangle95" },
  { id: 238, famille: "GeExtrude", article: "CJEXTplat95" },
  { id: 239, famille: "GeExtrude", article: "EclGe" },
  { id: 240, famille: "GeExtrude", article: "GeExtrude" },
  { id: 241, famille: "GeExtrude", article: "GénéralGeExtrude" },

  // ── Habillage ────────────────────────────────────────────────────────────
  { id: 242, famille: "Habillage", article: "Angle Double Ep" },
  { id: 243, famille: "Habillage", article: "Double Epingle" },
  { id: 244, famille: "Habillage", article: "Epingle" },
  { id: 245, famille: "Habillage", article: "Habillage Perfos 1 Rangée" },
  { id: 246, famille: "Habillage", article: "Habillage Perfos 3 Rangées" },
  { id: 247, famille: "Habillage", article: "Linteau Rab Perfos Type1" },
  { id: 248, famille: "Habillage", article: "Linteau Rab Perfos Type2" },
  { id: 249, famille: "Habillage", article: "Linteau Rab Perfos Type3" },
  { id: 250, famille: "Habillage", article: "Linteau Type1" },
  { id: 251, famille: "Habillage", article: "LintSpec-1" },
  { id: 252, famille: "Habillage", article: "Tableau Droit" },
  { id: 253, famille: "Habillage", article: "Tableau Droite Type1" },
  { id: 254, famille: "Habillage", article: "Tableau Gauche Type1" },
  { id: 255, famille: "Habillage", article: "Tableau Gauche" },
  { id: 256, famille: "Habillage", article: "Tableau" },

  // ── Lateraux ─────────────────────────────────────────────────────────────
  { id: 257, famille: "Lateraux", article: "Lateraux" },

  // ── Lisses ───────────────────────────────────────────────────────────────
  { id: 258, famille: "Lisses", article: "Goussets Lisse Type 3" },
  { id: 259, famille: "Lisses", article: "Lisse Poralu" },
  { id: 260, famille: "Lisses", article: "Lisse PoraluType2" },
  { id: 261, famille: "Lisses", article: "Lisse Type 1" },
  { id: 262, famille: "Lisses", article: "Lisse Type 2" },
  { id: 263, famille: "Lisses", article: "Lisse Type 3" },
  { id: 264, famille: "Lisses", article: "Lisse Type 3-Goussets" },
  { id: 265, famille: "Lisses", article: "Lisse Type 4" },

  // ── Profils Divers ───────────────────────────────────────────────────────
  { id: 266, famille: "Profils Divers", article: "Profil Divers" },
  { id: 267, famille: "Profils Divers", article: "Profil-1" },
  { id: 268, famille: "Profils Divers", article: "Profil-1-Perfos Type 1" },
  { id: 269, famille: "Profils Divers", article: "Profil-1-Perfos Type 2" },

  // ── Solin et Ge Pliées ───────────────────────────────────────────────────
  { id: 270, famille: "Solin et Ge Pliées", article: "Ge Type 1" },
  { id: 271, famille: "Solin et Ge Pliées", article: "Solins et Ge Pliées" },
  { id: 272, famille: "Solin et Ge Pliées", article: "Ge Type 1 Non Perfores" },

  // ── Solins et Ge Pliées Accessoires ─────────────────────────────────────
  { id: 273, famille: "Solins et Ge Pliées Accessoires", article: "Accessoires Solins et Ge Pliées" },
  { id: 274, famille: "Solins et Ge Pliées Accessoires", article: "EclInt Ge Type 1" }
];

/**
 * Référence matière — Convention AL
 * AL{epaisseur}-{RAL}{finition}
 * Épaisseurs : 06=0.6mm, 075=0.75mm, 10=1.0mm, 12=1.2mm, 15=1.5mm, 20=2.0mm
 * Finitions   : M=Mat, B=Brillant, NF=Non fini, ANO=Anodisé, BRT=Brut
 */
const PLIALU_EPAISSEURS = [
  { valeur: 0.6,  code: "06"  },
  { valeur: 0.75, code: "075" },
  { valeur: 1.0,  code: "10"  },
  { valeur: 1.2,  code: "12"  },
  { valeur: 1.5,  code: "15"  },
  { valeur: 2.0,  code: "20"  }
];

const PLIALU_FINITIONS = [
  { code: "M",   label: "Mat"       },
  { code: "B",   label: "Brillant"  },
  { code: "NF",  label: "Non fini"  },
  { code: "ANO", label: "Anodisé"   },
  { code: "BRT", label: "Brut"      }
];

/**
 * Référence pièce — Convention nommage
 * Préfixe + face principale (face la plus grande en mm)
 */
const PLIALU_PREFIXES = {
  "Bavette":                      "Bv",
  "Bavette Accessoire":           "BvAcc",
  "Couvertine":                   "C",
  "Couvertine Accessoire":        "CAcc",
  "Couvre Joint":                 "CJ",
  "Departs":                      "Dep",
  "Divers":                       "Div",
  "GeExtrude":                    "GeExt",
  "Habillage":                    "Hab",
  "Lateraux":                     "Lat",
  "Lisses":                       "Lis",
  "Profils Divers":               "Prof",
  "Solin et Ge Pliées":           "Sol",
  "Solins et Ge Pliées Accessoires": "SolAcc"
};

/**
 * Tarifs matière (€/m²) — à ajuster selon vos prix
 */
const PLIALU_TARIFS = {
  "AL06":  12.00,
  "AL075": 14.50,
  "AL10":  16.00,
  "AL12":  18.00,
  "AL15":  20.00,
  "AL20":  26.00
};

// Helper : récupérer les articles d'une famille
function getArticlesByFamille(famille) {
  return PLIALU_ARTICLES.filter(a => a.famille === famille);
}

// Helper : construire la référence matière
function buildRefMatiere(epaisseurValeur, ral, finitionCode) {
  const ep = PLIALU_EPAISSEURS.find(e => e.valeur === epaisseurValeur);
  if (!ep) return "";
  const ralStr = ral ? ral.toString().replace(/\s/g, "") : "BRNF";
  const fin = finitionCode || "NF";
  if (fin === "BRT" || !ral) return `AL${ep.code}-BRNF`;
  return `AL${ep.code}-${ralStr}${fin}`;
}

// Helper : construire la référence pièce
function buildRefPiece(famille, faces) {
  const prefix = PLIALU_PREFIXES[famille] || famille.substring(0, 3).toUpperCase();
  const valeurs = Object.values(faces).filter(v => v > 0);
  if (valeurs.length === 0) return prefix;
  const facePrincipale = Math.max(...valeurs);
  return `${prefix}${facePrincipale}`;
}
