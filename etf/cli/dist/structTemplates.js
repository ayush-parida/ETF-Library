"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructTemplates = void 0;
class StructTemplates {
    constructor() {
        this.templates = {
            import: "import { Table, Column, Model, HasMany, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, IsUrl, IsDate, IsBefore, IsAfter, Length, PrimaryKey, AutoIncrement, Is} from 'sequelize-typescript';\n\n",
            table: "@Table({timestamps: true, tableName: '%TABLE_NAME%'})\n",
            class: "export class %CLASS_NAME% extends Model {\n",
            primary: "\t@PrimaryKey\n",
            autoIncrement: "\t@AutoIncrement\n",
            column: "\t@Column",
            columnName: "\n\t%COLUMN_NAME%?: %COLUMN_TYPE%;\n",
            foreignKey: "\t@ForeignKey(() => %FOREIGN_MODEL%)\n",
            belongsTo: "\t@BelongsTo(() => %FOREIGN_MODEL%, '%FOREIGN_COLUMN_NAME%')",
            belongsToName: "\t%BELONGS_TO_NAME%?: %FOREIGN_MODEL%",
            hasMany: "\n\t@HasMany(() => %HAS_MANY_MODEL%, '%HAS_MANY_MODEL_PRIMARY_KEY%')",
            hasManyName: "\t%HAS_MANY_NAME%?: %HAS_MANY_MODEL%[];",
            options: "({ %OPTIONS% })",
            unique: "unique: %UNIQUE%",
            required: "allowNull: %REQUIRED%",
            default: "defaultValue: %DEFAULT_VALUE%",
            comment: "comment: '%COMMENT%'",
            predefinedCols: `
    @CreatedAt
    created_at?: Date;

    @UpdatedAt
    updated_at?: Date;

    @DeletedAt
    deleted_at?: Date;
    
    @Column({defaultValue: true})
    is_active?: boolean;\n`,
            isUrl: "\t@IsUrl\n",
            isDate: "\t@IsDate\n",
            isBefore: "\t@IsBefore('%BEFORE_YYYY_MM_DD%')\n",
            isAfter: "\t@IsAfter('%AFTER_YYYY_MM_DD%')\n",
            regex: "%REGEX%",
            regexName: "%REGEX_NAME%",
            regexCondition: `
    @Is('%REGEX_NAME%', (value) => {
        if (!%REGEX%.test(value)) {
            throw new Error('Error in Validation of %REGEX_NAME%');
        }
    })`,
            length: "\t@Length({ %LENGTHS% })",
            min: "min: %MIN%",
            max: "max: %MAX%",
            moduleImport: "import { %IMPORT_MODEL_NAME% } from '%IMPORT_MODEL_PATH%';",
        };
    }
}
exports.StructTemplates = StructTemplates;
//# sourceMappingURL=structTemplates.js.map